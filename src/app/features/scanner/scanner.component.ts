import { Component, ElementRef, EventEmitter, NgZone, OnDestroy, Output, ViewChild } from "@angular/core";
import { BarcodeDetector, prepareZXingModule } from "barcode-detector/ponyfill";

/**
 * Le moteur de lecture (ZXing-C++ compilé en WebAssembly) est servi par l'app elle-même
 * (copié dans assets/wasm par angular.json) au lieu du CDN jsDelivr par défaut :
 * fonctionne hors ligne dans la PWA et ne dépend d'aucun service tiers.
 */
prepareZXingModule({
  overrides: {
    locateFile: (path: string, prefix: string) =>
      path.endsWith(".wasm") ? new URL(`assets/wasm/${path}`, document.baseURI).href : prefix + path,
  },
});

/** Formats utiles à l'app (moins de formats = détection plus rapide). */
const FORMATS = ["ean_13", "ean_8", "upc_a", "upc_e", "code_128", "code_39", "qr_code"] as const;

/** Délai entre deux analyses d'image (ms) : assez réactif sans saturer le CPU du téléphone. */
const SCAN_INTERVAL_MS = 120;

/** Part centrale de l'image analysée (correspond au cadre de visée affiché). */
const CROP_RATIO = 0.8;

const CAMERA_STORAGE_KEY = "abii.scanner.cameraId";

type ScannerState = "idle" | "starting" | "scanning" | "error";

/**
 * Caméras arrière à privilégier sur iPhone : les caméras "virtuelles" multi-objectifs
 * basculent automatiquement en mode macro de près, alors que la caméra principale
 * d'un iPhone Pro ne fait pas la mise au point en dessous de ~20 cm (image floue).
 * Libellés iOS en anglais et en français.
 */
const PREFERRED_BACK_CAMERAS: RegExp[] = [
  /triple/i,
  /dual wide|double grand|grand[- ]angle double/i,
  /dual|double/i,
];
const EXCLUDED_CAMERAS = /front|avant|facetime|ultra|télé|tele/i;

// Contraintes non (encore) typées par TypeScript 4.7 mais supportées par certains navigateurs
type ExtendedCapabilities = MediaTrackCapabilities & { focusMode?: string[]; zoom?: { min: number; max: number } };

@Component({
  selector: "app-scanner",
  templateUrl: "./scanner.component.html",
  styleUrls: ["./scanner.component.scss"],
})
export class ScannerComponent implements OnDestroy {
  /** Valeur du code lu. Le scanner s'arrête après chaque lecture réussie. */
  @Output() scanSuccess = new EventEmitter<string>();
  @Output() scanError = new EventEmitter<Error>();

  @ViewChild("video") videoRef?: ElementRef<HTMLVideoElement>;

  state: ScannerState = "idle";
  errorMessage = "";
  readonly supported = typeof navigator !== "undefined" && !!navigator.mediaDevices?.getUserMedia && window.isSecureContext;

  private stream?: MediaStream;
  private timer?: ReturnType<typeof setTimeout>;
  private readonly detector = new BarcodeDetector({ formats: [...FORMATS] });
  private readonly canvas = document.createElement("canvas");

  constructor(private zone: NgZone) {
  }

  get active(): boolean {
    return this.state === "starting" || this.state === "scanning";
  }

  toggle(): void {
    if (this.active) this.stop();
    else void this.start();
  }

  async start(): Promise<void> {
    this.state = "starting";
    this.errorMessage = "";
    try {
      let stream = await this.openCamera(this.readStoredCameraId());

      // Les libellés des caméras ne sont disponibles qu'après l'autorisation : on choisit
      // alors la meilleure caméra arrière (macro sur iPhone) et on bascule si besoin.
      const best = await this.pickBestBackCamera();
      const currentId = stream.getVideoTracks()[0]?.getSettings().deviceId;
      if (best && best !== currentId) {
        stream.getTracks().forEach(t => t.stop());
        stream = await this.openCamera(best);
      }
      this.storeCameraId(stream.getVideoTracks()[0]?.getSettings().deviceId);
      this.stream = stream;

      if (!this.active) { // arrêté pendant l'ouverture de la caméra
        this.releaseCamera();
        return;
      }

      const video = this.videoRef!.nativeElement;
      video.srcObject = stream;
      await video.play();
      await this.tuneTrack(stream.getVideoTracks()[0]);

      this.state = "scanning";
      this.zone.runOutsideAngular(() => this.scheduleScan());
    } catch (e) {
      this.fail(e);
    }
  }

  stop(): void {
    this.state = "idle";
    this.releaseCamera();
  }

  ngOnDestroy(): void {
    this.stop();
  }

  // ------------------------------------------------------------------ caméra

  private openCamera(deviceId?: string): Promise<MediaStream> {
    return navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        ...(deviceId ? { deviceId: { exact: deviceId } } : { facingMode: { ideal: "environment" } }),
        // Haute résolution : les barres fines d'un EAN restent nettes
        width: { ideal: 1920 },
        height: { ideal: 1080 },
      },
    }).catch(err => {
      // Caméra mémorisée disparue : on retente sans elle
      if (deviceId && (err?.name === "OverconstrainedError" || err?.name === "NotFoundError")) {
        this.storeCameraId(undefined);
        return this.openCamera();
      }
      throw err;
    });
  }

  private async pickBestBackCamera(): Promise<string | undefined> {
    const cameras = (await navigator.mediaDevices.enumerateDevices())
      .filter(d => d.kind === "videoinput" && d.label && !EXCLUDED_CAMERAS.test(d.label));
    for (const pattern of PREFERRED_BACK_CAMERAS) {
      const match = cameras.find(c => pattern.test(c.label));
      if (match) return match.deviceId;
    }
    return undefined;
  }

  /** Mise au point continue et léger zoom quand le navigateur le permet (surtout Android). */
  private async tuneTrack(track?: MediaStreamTrack): Promise<void> {
    if (!track?.getCapabilities) return;
    const caps = track.getCapabilities() as ExtendedCapabilities;
    const advanced: Record<string, unknown>[] = [];
    if (caps.focusMode?.includes("continuous")) advanced.push({ focusMode: "continuous" });
    // Zoom x2 : permet de tenir le téléphone plus loin, au-delà de la distance minimale de mise au point
    if (caps.zoom && caps.zoom.max >= 2) advanced.push({ zoom: 2 });
    if (!advanced.length) return;
    try {
      await track.applyConstraints({ advanced } as MediaTrackConstraints);
    } catch {
      // contraintes facultatives : on garde les réglages par défaut
    }
  }

  private releaseCamera(): void {
    clearTimeout(this.timer);
    this.stream?.getTracks().forEach(t => t.stop());
    this.stream = undefined;
    const video = this.videoRef?.nativeElement;
    if (video) video.srcObject = null;
  }

  // ------------------------------------------------------------------ détection

  private scheduleScan(): void {
    this.timer = setTimeout(() => void this.scanFrame(), SCAN_INTERVAL_MS);
  }

  private async scanFrame(): Promise<void> {
    if (this.state !== "scanning") return;
    const video = this.videoRef?.nativeElement;
    if (!video || video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) {
      this.scheduleScan();
      return;
    }
    try {
      const codes = await this.detector.detect(this.cropCenter(video));
      const value = codes[0]?.rawValue;
      if (value && this.state === "scanning") {
        navigator.vibrate?.(80);
        this.zone.run(() => {
          this.stop();
          this.scanSuccess.emit(value);
        });
        return;
      }
    } catch (e) {
      // Une image illisible n'est pas une erreur : on continue, sauf échec du moteur
      if (e instanceof Error && /wasm|WebAssembly|fetch/i.test(e.message)) {
        this.zone.run(() => this.fail(e));
        return;
      }
    }
    this.scheduleScan();
  }

  /** Ne garde que le centre de l'image (zone du cadre de visée) : plus rapide et moins de faux positifs. */
  private cropCenter(video: HTMLVideoElement): HTMLCanvasElement {
    const w = Math.round(video.videoWidth * CROP_RATIO);
    const h = Math.round(video.videoHeight * CROP_RATIO);
    if (this.canvas.width !== w) this.canvas.width = w;
    if (this.canvas.height !== h) this.canvas.height = h;
    this.canvas.getContext("2d", { willReadFrequently: true } as CanvasRenderingContext2DSettings)!
      .drawImage(video, (video.videoWidth - w) / 2, (video.videoHeight - h) / 2, w, h, 0, 0, w, h);
    return this.canvas;
  }

  // ------------------------------------------------------------------ erreurs & préférences

  private fail(e: unknown): void {
    this.releaseCamera();
    this.state = "error";
    const name = (e as { name?: string })?.name;
    this.errorMessage =
      name === "NotAllowedError" ? "Accès à la caméra refusé. Autorisez-le dans les réglages du navigateur." :
      name === "NotFoundError" ? "Aucune caméra trouvée sur cet appareil." :
      name === "NotReadableError" ? "La caméra est déjà utilisée par une autre application." :
      "Impossible de démarrer le scanner.";
    this.scanError.emit(e instanceof Error ? e : new Error(String(e)));
  }

  private readStoredCameraId(): string | undefined {
    try {
      return localStorage.getItem(CAMERA_STORAGE_KEY) ?? undefined;
    } catch {
      return undefined;
    }
  }

  private storeCameraId(id?: string): void {
    try {
      if (id) localStorage.setItem(CAMERA_STORAGE_KEY, id);
      else localStorage.removeItem(CAMERA_STORAGE_KEY);
    } catch {
      // stockage indisponible (navigation privée) : sans conséquence
    }
  }
}

import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild } from "@angular/core";
import { BarcodeFormat, DecodeHintType, Result } from "@zxing/library";
import { ZXingScannerComponent } from "@zxing/ngx-scanner";

@Component({
  selector: "app-scanner",
  templateUrl: "./scanner.component.html",
  styleUrls: ["./scanner.component.scss"],
})
export class ScannerComponent implements OnInit, AfterViewInit {
  enabled: boolean = false;
  enableScanning: boolean = false;

  @Output() scanSuccess = new EventEmitter<string>();
  @Output() scanError = new EventEmitter<Error>();
  @Output() scanComplete = new EventEmitter<Result>();
  @ViewChild("scanner") scanner?: ZXingScannerComponent;

  constructor() {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    if (this.scanner) {
      this.scanner.formats = [BarcodeFormat.AZTEC, BarcodeFormat.CODABAR, BarcodeFormat.CODE_39, BarcodeFormat.CODE_93, BarcodeFormat.CODE_128, BarcodeFormat.DATA_MATRIX, BarcodeFormat.EAN_8, BarcodeFormat.EAN_13, BarcodeFormat.ITF, BarcodeFormat.MAXICODE, BarcodeFormat.PDF_417, BarcodeFormat.QR_CODE, BarcodeFormat.UPC_A, BarcodeFormat.UPC_E, BarcodeFormat.UPC_EAN_EXTENSION];

      const hints = new Map<DecodeHintType, any>();
      hints.set(DecodeHintType.POSSIBLE_FORMATS, this.scanner.formats);

      const constraints: MediaTrackConstraints = {
        frameRate: 10,
        suppressLocalAudioPlayback: true,
      }

      this.scanner.delayBetweenScanSuccess = 10000;
      this.scanner.scanComplete.subscribe((res) => this.scanComplete.emit(res));
      this.scanner.scanError.subscribe((err) => this.scanError.emit(err));
      this.scanner.scanSuccess.subscribe((res) => this.scanSuccess.emit(res));
      this.scanner.timeBetweenScans = 100;
      this.scanner.hints = hints;
      this.scanner.videoConstraints = constraints;
      this.scanner.askForPermission();

      this.scanner.camerasFound
        .subscribe((dev) => this.enabled = dev && this.enabled);

      this.scanner.permissionResponse
        .subscribe((res) => this.enabled = res);
    }
  }

}

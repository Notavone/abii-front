import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { SwPush } from "@angular/service-worker";
import { firstValueFrom, map, shareReplay } from "rxjs";

export type PushStatus = "unsupported" | "default" | "denied" | "granted";

export interface PushTestReport {
  sent: number;
  failed: number;
  errors: string[];
}

/**
 * Notifications push via le service worker Angular.
 *
 * - La clé publique VAPID vient du backend (source unique, voir GET /api/notifications/public-key) :
 *   une clé différente de celle qui signe les envois fait échouer chaque notification.
 * - `sync()` (au démarrage / à la connexion) n'affiche jamais de demande d'autorisation : il ne fait
 *   que (re)transmettre l'abonnement, et le recrée s'il a été fait avec une autre clé.
 * - `enable()` doit être appelé depuis un geste utilisateur (bouton) : iOS l'exige pour la demande d'autorisation.
 */
@Injectable({
  providedIn: "root",
})
export class NotificationsService {
  baseUrl = "/api/notifications";

  private readonly publicKey$ = this.http.get<{ publicKey: string }>(this.baseUrl + "/public-key").pipe(
    map((res) => res.publicKey),
    shareReplay(1),
  );

  private syncing?: Promise<void>;

  constructor(
    private http: HttpClient,
    private swPush: SwPush,
  ) {
  }

  /** État des notifications sur cet appareil. */
  get status(): PushStatus {
    if (!this.swPush.isEnabled || typeof Notification === "undefined" || !("PushManager" in window)) return "unsupported";
    return Notification.permission as PushStatus;
  }

  /** Transmet l'abonnement existant au backend, sans jamais demander d'autorisation. */
  sync(): Promise<void> {
    if (this.status !== "granted") return Promise.resolve();
    // Plusieurs appels simultanés (démarrage + connexion) : un seul traitement
    return this.syncing ??= this.ensureSubscription(false)
      .catch((e) => console.warn("Push: synchronisation impossible", e))
      .finally(() => this.syncing = undefined);
  }

  /** Active les notifications (demande l'autorisation si besoin). À appeler depuis un clic. */
  async enable(): Promise<void> {
    if (this.status === "unsupported") throw new Error("unsupported");
    await this.ensureSubscription(true);
  }

  sendTest(): Promise<PushTestReport> {
    return firstValueFrom(this.http.get<PushTestReport>(this.baseUrl + "/test"));
  }

  /** @deprecated conservé pour la page de test */
  testPush() {
    void this.sendTest();
  }

  private async ensureSubscription(allowPrompt: boolean): Promise<void> {
    const publicKey = await firstValueFrom(this.publicKey$);
    let subscription = await firstValueFrom(this.swPush.subscription);

    // Abonnement créé avec une autre clé (ancienne clé en dur dans le front) : inutilisable, on le recrée
    if (subscription && !sameKey(subscription.options.applicationServerKey, publicKey)) {
      await subscription.unsubscribe();
      subscription = null;
    }

    if (!subscription) {
      if (!allowPrompt && this.status !== "granted") return;
      subscription = await this.swPush.requestSubscription({ serverPublicKey: publicKey });
    }

    await firstValueFrom(this.http.post(this.baseUrl + "/subscribe", subscription.toJSON()));
  }
}

function sameKey(current: ArrayBuffer | null, base64UrlKey: string): boolean {
  if (!current) return false;
  const expected = base64UrlToBytes(base64UrlKey);
  const actual = new Uint8Array(current);
  return actual.length === expected.length && actual.every((b, i) => b === expected[i]);
}

function base64UrlToBytes(value: string): Uint8Array {
  const base64 = (value + "=".repeat((4 - value.length % 4) % 4)).replace(/-/g, "+").replace(/_/g, "/");
  return Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
}

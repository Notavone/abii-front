import { Component } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { NotificationsService, PushStatus } from "./notifications.service";

/** Carte "Notifications" du profil : état sur cet appareil, activation et test. */
@Component({
  selector: "app-notifications-settings",
  template: `
    <mat-card class="mt-3">
      <mat-card-title>Notifications</mat-card-title>
      <mat-card-content>
        <p [ngSwitch]="status">
          <ng-container *ngSwitchCase="'granted'">Activées sur cet appareil.</ng-container>
          <ng-container *ngSwitchCase="'denied'">
            Bloquées sur cet appareil. Réactivez-les dans les réglages
            (iPhone : Réglages → Notifications → ABII).
          </ng-container>
          <ng-container *ngSwitchCase="'unsupported'">
            Indisponibles ici. Sur iPhone, installez d'abord l'app sur l'écran d'accueil
            (Partager → Sur l'écran d'accueil) puis ouvrez-la depuis son icône.
          </ng-container>
          <ng-container *ngSwitchDefault>Pas encore activées sur cet appareil.</ng-container>
        </p>
      </mat-card-content>
      <div class="space">
        <button *ngIf="status === 'default' || status === 'granted'" mat-raised-button color="primary"
                type="button" [disabled]="busy" (click)="enable()">
          {{ status === 'granted' ? 'Réenregistrer cet appareil' : 'Activer les notifications' }}
        </button>
        <button *ngIf="status === 'granted'" mat-button color="primary" type="button" [disabled]="busy" (click)="test()">
          Envoyer une notification de test
        </button>
      </div>
    </mat-card>
  `,
})
export class NotificationsSettingsComponent {
  busy = false;

  constructor(
    private notificationsService: NotificationsService,
    private snackBar: MatSnackBar,
  ) {
  }

  get status(): PushStatus {
    return this.notificationsService.status;
  }

  async enable() {
    this.busy = true;
    try {
      await this.notificationsService.enable();
      this.snackBar.open("Notifications activées sur cet appareil");
    } catch {
      this.snackBar.open(this.status === "denied"
        ? "Notifications refusées : réactivez-les dans les réglages de l'appareil"
        : "Impossible d'activer les notifications");
    } finally {
      this.busy = false;
    }
  }

  async test() {
    this.busy = true;
    try {
      const report = await this.notificationsService.sendTest();
      this.snackBar.open(report.sent
        ? "Notification envoyée"
        : `Échec de l'envoi${report.errors[0] ? " : " + report.errors[0] : " (aucun appareil enregistré)"}`);
    } catch {
      this.snackBar.open("Impossible d'envoyer la notification de test");
    } finally {
      this.busy = false;
    }
  }
}

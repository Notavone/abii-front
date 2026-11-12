import { Injectable, signal } from "@angular/core";
import { Portal } from "@angular/cdk/portal";

/**
 * Emplacement de barre basse de l'application (sous la zone de contenu, comme une barre d'onglets iOS).
 *
 * Une page y affiche sa barre via un portail CDK au lieu d'un `position: fixed` : sur iPhone, un élément
 * fixe imbriqué dans les conteneurs défilants de Material (sidenav, onglets) n'est pas toujours placé
 * par rapport à l'écran. Ici la barre fait partie de la mise en page : la zone de contenu rétrécit d'autant.
 */
@Injectable({ providedIn: "root" })
export class BottomBarService {
  readonly portal = signal<Portal<unknown> | null>(null);

  attach(portal: Portal<unknown>): void {
    this.portal.set(portal);
  }

  /** Retire la barre, seulement si c'est toujours celle de l'appelant. */
  detach(portal?: Portal<unknown>): void {
    if (!portal || this.portal() === portal) this.portal.set(null);
  }
}

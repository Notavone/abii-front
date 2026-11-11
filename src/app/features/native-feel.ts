/**
 * Comportement "application native" sur mobile, en complément du viewport (index.html) et du CSS (styles.scss).
 *
 * Safari iOS ignore `user-scalable=no` depuis iOS 10 : le zoom à deux doigts doit être bloqué en JavaScript.
 * - `gesturestart/gesturechange/gestureend` : événements propres à Safari pour le pincement
 * - `touchmove` à plusieurs doigts : filet de sécurité pour les autres navigateurs
 * Le double-tap pour zoomer est bloqué en CSS (`touch-action: manipulation`).
 */
export function enableNativeFeel(): void {
  const block = (e: Event) => e.preventDefault();

  for (const type of ["gesturestart", "gesturechange", "gestureend"]) {
    document.addEventListener(type, block, { passive: false });
  }

  document.addEventListener("touchmove", (e: TouchEvent) => {
    if (e.touches.length > 1) e.preventDefault();
  }, { passive: false });
}

// Build "pwa" : test de la PWA en local depuis un téléphone (voir pwa-dev/README.md).
// production: true active le service worker ; apiUrl vide = même origine,
// le serveur pwa-dev relaie /api vers le backend local.
export const environment = {
  production: true,
  apiUrl: "",
};

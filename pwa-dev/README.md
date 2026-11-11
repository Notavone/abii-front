# Tester la PWA en dev sur un téléphone

`npm run pwa:dev` construit l'app avec le service worker (`ng build --configuration pwa --watch`)
et la sert en HTTPS sur le réseau local, en relayant `/api` vers le backend local.

## Prérequis
- Backend lancé : `npm run start:dev` dans `abii-backend` (port 3000).
- Téléphone sur le **même réseau** que le PC (pas un Wi-Fi « invité » isolé).
- Réseau Windows en profil **Privé** et Node.js autorisé dans le pare-feu
  (popup « Autoriser l'accès » au premier lancement), ports **4480** et **4443**.

## Première fois sur l'iPhone
1. Lancer `npm run pwa:dev` : l'adresse s'affiche (ex. `http://192.168.1.69:4480/`).
2. Ouvrir cette adresse **dans Safari** → « Télécharger le certificat » → Autoriser.
3. Réglages → **Profil téléchargé** → Installer.
4. Réglages → Général → Informations → **Réglages des certificats** → activer « ABII Dev Local CA ».
5. Ouvrir `https://<ip-du-pc>:4443/` dans Safari → Partager → **Sur l'écran d'accueil**.

Ensuite : relancer `npm run pwa:dev`, l'app installée se met à jour après chaque rebuild
(fermer/rouvrir l'app, parfois deux fois, le service worker télécharge la nouvelle version en arrière-plan).

## Notes
- Certificats dans `pwa-dev/certs/` (ignoré par git). L'autorité est créée une fois ;
  si l'IP du PC change, seul le certificat serveur est régénéré : rien à refaire sur l'iPhone,
  mais l'app installée pointe vers l'ancienne IP → la réinstaller (ou fixer l'IP du PC dans la box).
- Ne jamais partager `pwa-dev/certs/ca.key` : elle permet de signer des certificats acceptés par le téléphone.
  Pour révoquer : supprimer le profil sur l'iPhone et le dossier `certs/`.
- Variables : `PWA_HTTPS_PORT`, `PWA_HTTP_PORT`, `PWA_API`, `PWA_NO_BUILD=1`.

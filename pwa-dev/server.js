#!/usr/bin/env node
/**
 * Test de la PWA en développement depuis un téléphone sur le même Wi-Fi.
 *
 *   npm run pwa:dev            (depuis abii-front, backend lancé à côté)
 *
 * - lance `ng build --configuration pwa --watch` (service worker actif, rebuild à chaque modif)
 * - sert le build en HTTPS sur le réseau local (port 4443) : iOS exige HTTPS pour le service worker
 * - relaie /api vers le backend local (même origine : pas de CORS, cookies OK)
 * - sert en HTTP (port 4480) une page d'aide + le certificat d'autorité à installer sur le téléphone
 *
 * Les certificats sont générés avec OpenSSL (fourni par Git for Windows) dans pwa-dev/certs/ (ignoré par git).
 * L'autorité (CA) est créée une seule fois ; le certificat serveur est régénéré si l'IP du PC change.
 *
 * Variables optionnelles : PWA_HTTPS_PORT, PWA_HTTP_PORT, PWA_API (défaut http://localhost:3000), PWA_NO_BUILD=1
 */
const fs = require("fs");
const path = require("path");
const os = require("os");
const http = require("http");
const https = require("https");
const { spawn, execFileSync } = require("child_process");

const ROOT = path.join(__dirname, "..");
const DIST = path.join(ROOT, "dist", "abii-front-pwa");
const CERTS = path.join(__dirname, "certs");
const HTTPS_PORT = Number(process.env.PWA_HTTPS_PORT) || 4443;
const HTTP_PORT = Number(process.env.PWA_HTTP_PORT) || 4480;
const API = new URL(process.env.PWA_API || "http://localhost:3000");
const CA_NAME = "ABII Dev Local CA";

// ---------------------------------------------------------------- réseau
function lanIPs() {
  // Ignore les cartes virtuelles (WSL, Hyper-V, VirtualBox, VMware…) : le téléphone ne peut pas les joindre
  const virtual = /vethernet|wsl|hyper-v|virtualbox|vmware|vbox|docker|loopback/i;
  return Object.entries(os.networkInterfaces())
    .filter(([name]) => !virtual.test(name))
    .flatMap(([, addrs]) => addrs)
    .filter(i => i && i.family === "IPv4" && !i.internal && !i.address.startsWith("169.254."))
    .map(i => i.address);
}

// ---------------------------------------------------------------- certificats
function findOpenssl() {
  const candidates = [
    "openssl",
    "C:\\Program Files\\Git\\mingw64\\bin\\openssl.exe",
    "C:\\Program Files\\Git\\usr\\bin\\openssl.exe",
  ];
  for (const c of candidates) {
    try { execFileSync(c, ["version"], { stdio: "ignore" }); return c; } catch { /* suivant */ }
  }
  throw new Error("OpenSSL introuvable (installé avec Git for Windows normalement).");
}

function ensureCerts(ips) {
  fs.mkdirSync(CERTS, { recursive: true });
  const f = n => path.join(CERTS, n);
  let openssl;
  const run = args => execFileSync(openssl ??= findOpenssl(), args, { stdio: "pipe" });

  if (!fs.existsSync(f("ca.key")) || !fs.existsSync(f("ca.crt"))) {
    console.log("Création de l'autorité de certification locale…");
    run(["req", "-x509", "-newkey", "rsa:2048", "-nodes", "-sha256", "-days", "825",
      "-keyout", f("ca.key"), "-out", f("ca.crt"), "-subj", `/CN=${CA_NAME}`,
      "-addext", "basicConstraints=critical,CA:TRUE",
      "-addext", "keyUsage=critical,keyCertSign,cRLSign"]);
  }

  const host = os.hostname().toLowerCase().replace(/[^a-z0-9-]/g, "-");
  const san = ["DNS:localhost", `DNS:${host}.local`, "IP:127.0.0.1", ...ips.map(ip => `IP:${ip}`)].join(",");
  if (fs.existsSync(f("server.crt")) && fs.existsSync(f("san.txt")) && fs.readFileSync(f("san.txt"), "utf8") === san) return;

  console.log("Création du certificat serveur pour :", san);
  fs.writeFileSync(f("server.ext"), [
    "basicConstraints=CA:FALSE",
    "keyUsage=critical,digitalSignature,keyEncipherment",
    "extendedKeyUsage=serverAuth",
    `subjectAltName=${san}`,
  ].join("\n"));
  run(["req", "-new", "-newkey", "rsa:2048", "-nodes", "-keyout", f("server.key"), "-out", f("server.csr"), "-subj", "/CN=ABII Dev"]);
  // 397 jours max : au-delà, iOS refuse le certificat
  run(["x509", "-req", "-in", f("server.csr"), "-CA", f("ca.crt"), "-CAkey", f("ca.key"), "-CAcreateserial",
    "-out", f("server.crt"), "-days", "397", "-sha256", "-extfile", f("server.ext")]);
  fs.writeFileSync(f("san.txt"), san);
}

// ---------------------------------------------------------------- fichiers statiques
const TYPES = {
  ".html": "text/html; charset=utf-8", ".js": "application/javascript", ".css": "text/css",
  ".json": "application/json", ".webmanifest": "application/manifest+json", ".map": "application/json",
  ".png": "image/png", ".jpg": "image/jpeg", ".svg": "image/svg+xml", ".ico": "image/x-icon",
  ".wasm": "application/wasm", ".woff": "font/woff", ".woff2": "font/woff2", ".ttf": "font/ttf", ".txt": "text/plain",
};

function serveStatic(req, res) {
  const urlPath = decodeURIComponent(new URL(req.url, "http://x").pathname);
  let file = path.normalize(path.join(DIST, urlPath));
  if (!file.startsWith(DIST)) { res.writeHead(403).end(); return; }
  if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) {
    if (path.extname(urlPath)) { res.writeHead(404).end("Not found"); return; } // fichier manquant
    file = path.join(DIST, "index.html"); // route Angular -> index.html
  }
  if (!fs.existsSync(file)) {
    res.writeHead(503, { "Content-Type": "text/plain; charset=utf-8", "Retry-After": "5" })
      .end("Build Angular en cours… recharge dans quelques secondes.");
    return;
  }
  res.writeHead(200, {
    "Content-Type": TYPES[path.extname(file)] || "application/octet-stream",
    "Cache-Control": "no-cache", // le service worker gère le cache, le navigateur revalide toujours
  });
  fs.createReadStream(file).pipe(res);
}

// ---------------------------------------------------------------- proxy /api
function proxyApi(req, res) {
  const headers = { ...req.headers, host: API.host };
  delete headers.origin; // requête même origine côté téléphone : inutile de déclencher le CORS du backend
  const upstream = http.request(
    { hostname: API.hostname, port: API.port, path: req.url, method: req.method, headers },
    up => { res.writeHead(up.statusCode, up.headers); up.pipe(res); },
  );
  upstream.on("error", () => {
    if (!res.headersSent) res.writeHead(502, { "Content-Type": "text/plain; charset=utf-8" });
    res.end(`Backend injoignable sur ${API.origin} : lance \`npm run start:dev\` dans abii-backend.`);
  });
  req.pipe(upstream);
}

// ---------------------------------------------------------------- page d'aide HTTP
function helpPage(ips) {
  const links = ips.map(ip => `<li><a href="https://${ip}:${HTTPS_PORT}/">https://${ip}:${HTTPS_PORT}/</a></li>`).join("");
  return `<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>ABII – PWA dev</title><style>body{font:16px/1.5 -apple-system,system-ui,sans-serif;max-width:640px;margin:0 auto;padding:16px}
a.btn{display:inline-block;background:#3f51b5;color:#fff;padding:10px 16px;border-radius:8px;text-decoration:none}li{margin:6px 0}</style></head><body>
<h1>ABII – test PWA en dev</h1>
<h2>1. Installer le certificat (une seule fois)</h2>
<p><a class="btn" href="/abii-dev-ca.crt">Télécharger le certificat</a></p>
<p>Puis sur l'iPhone : <b>Réglages → Profil téléchargé → Installer</b>,<br>
puis <b>Réglages → Général → Informations → Réglages des certificats</b> → activer « ${CA_NAME} ».</p>
<h2>2. Ouvrir l'app en HTTPS dans Safari</h2><ul>${links}</ul>
<h2>3. Installer la PWA</h2><p>Bouton <b>Partager</b> → <b>Sur l'écran d'accueil</b>.</p>
</body></html>`;
}

// ---------------------------------------------------------------- démarrage
function startBuild() {
  if (process.env.PWA_NO_BUILD) return null;
  const ng = path.join(ROOT, "node_modules", "@angular", "cli", "bin", "ng.js");
  const child = spawn(process.execPath, [ng, "build", "--configuration", "pwa", "--watch"], { cwd: ROOT, stdio: ["ignore", "pipe", "pipe"] });
  const relay = data => {
    const text = data.toString();
    if (/Build at:|Error|error/.test(text)) process.stdout.write(`[ng build] ${text.trim().split("\n").filter(l => /Build at|rror/.test(l)).join("\n[ng build] ")}\n`);
  };
  child.stdout.on("data", relay);
  child.stderr.on("data", relay);
  child.on("exit", code => { if (code) console.error(`[ng build] arrêté (code ${code})`); });
  return child;
}

const ips = lanIPs();
ensureCerts(ips);
const build = startBuild();
const stop = () => { build?.kill(); process.exit(0); };
process.on("SIGINT", stop);
process.on("SIGTERM", stop);

https.createServer(
  { key: fs.readFileSync(path.join(CERTS, "server.key")), cert: fs.readFileSync(path.join(CERTS, "server.crt")) },
  (req, res) => (req.url.startsWith("/api") ? proxyApi(req, res) : serveStatic(req, res)),
).listen(HTTPS_PORT, "0.0.0.0");

http.createServer((req, res) => {
  if (req.url.startsWith("/abii-dev-ca.crt")) {
    res.writeHead(200, { "Content-Type": "application/x-x509-ca-cert", "Content-Disposition": 'attachment; filename="abii-dev-ca.crt"' });
    fs.createReadStream(path.join(CERTS, "ca.crt")).pipe(res);
    return;
  }
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" }).end(helpPage(ips));
}).listen(HTTP_PORT, "0.0.0.0");

console.log(`
PWA dev prête (le premier build Angular prend ~20 s).
  Page d'aide (certificat) : ${ips.map(ip => `http://${ip}:${HTTP_PORT}/`).join("  ") || "aucune IP réseau détectée"}
  App HTTPS               : ${ips.map(ip => `https://${ip}:${HTTPS_PORT}/`).join("  ")}
  API relayée vers        : ${API.origin}
Le téléphone doit être sur le même Wi-Fi, et le pare-feu Windows doit autoriser les ports ${HTTP_PORT} et ${HTTPS_PORT}.
`);

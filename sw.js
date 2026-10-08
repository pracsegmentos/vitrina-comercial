const VERSION = "v1";
const SHELL_CACHE = `vitrina-shell-${VERSION}`;
const IMG_CACHE = `vitrina-imgs-${VERSION}`;

const SHELL_FILES = [
  "./",
  "./index.html",
  "./css/style.css",
  "./js/app.js",
  "./manifest.json",
  "./images/placeholder.svg",
  "./images/logo-nutresa.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(SHELL_CACHE);
      await cache.addAll(SHELL_FILES);
      self.skipWaiting();
    })()
  );
});

async function precacheImages() {
  try {
    const res = await fetch("./data/initiatives.json");
    const initiatives = await res.json();
    const cache = await caches.open(IMG_CACHE);
    const urls = new Set();
    initiatives.forEach((p) => { if (p.imagen) urls.add(p.imagen); });
    await Promise.all(
      [...urls].map(async (url) => {
        try {
          const r = await fetch(url);
          if (r.ok) await cache.put(url, r);
        } catch (e) { /* sin conexión: se cacheará en el próximo uso */ }
      })
    );
  } catch (e) { /* sin conexión en el primer registro */ }
}

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.filter((k) => k !== SHELL_CACHE && k !== IMG_CACHE).map((k) => caches.delete(k)));
      self.clients.claim();
      precacheImages();
    })()
  );
});

// Responde al instante con lo que ya hay en caché (rápido, funciona sin
// internet), y de paso pide la versión actual en segundo plano para que la
// próxima vez ya esté actualizada.
async function staleWhileRevalidate(event, cacheName) {
  const req = event.request;
  const cache = await caches.open(cacheName);
  const cached = await cache.match(req);
  const fetchAndUpdate = fetch(req).then((res) => { if (res.ok) cache.put(req, res.clone()); return res; }).catch(() => null);
  event.waitUntil(fetchAndUpdate);
  if (cached) return cached;
  const res = await fetchAndUpdate;
  return res || Response.error();
}

async function networkFirst(req, cacheName) {
  const cache = await caches.open(cacheName);
  try {
    const res = await fetch(req);
    if (res.ok) cache.put(req, res.clone());
    return res;
  } catch (e) {
    const cached = await cache.match(req);
    if (cached) return cached;
    throw e;
  }
}

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;
  if (url.pathname.includes("/admin")) return;

  if (url.pathname.endsWith("/data/initiatives.json")) {
    event.respondWith(networkFirst(req, SHELL_CACHE));
    return;
  }
  if (url.pathname.includes("/images/")) {
    event.respondWith(staleWhileRevalidate(event, IMG_CACHE));
    return;
  }
  event.respondWith(staleWhileRevalidate(event, SHELL_CACHE));
});

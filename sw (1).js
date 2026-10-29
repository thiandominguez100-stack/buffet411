/* Buffet 411 · service worker. Cambiá VERSION cada vez que subas cambios a GitHub
   para que los celulares descarguen la versión nueva. */
const VERSION = 'buffet-411-v8';
const BASE = ['./', 'index.html', 'manifest.json', 'logo.png', 'icon-192.png', 'icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(BASE)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (req.mode === 'navigate') {
    // Solo la app de alumnos (la raíz o index.html) se guarda y funciona sin conexión.
    // Los paneles (admin, pedidos, editor) NO pasan por acá: nunca se guardan ni se confunden con la app.
    if (!/\/(index\.html)?$/.test(url.pathname)) return;
    e.respondWith(fetch(req).then(r => { if (r.ok) { const c = r.clone(); caches.open(VERSION).then(x => x.put('index.html', c)); } return r; })
      .catch(() => caches.match('index.html')));
    return;
  }
  // Archivos propios y tipografías: copia guardada, y se actualiza en segundo plano
  if (url.origin === location.origin || /fonts\.(googleapis|gstatic)\.com$/.test(url.hostname)) {
    e.respondWith(caches.match(req).then(hit => {
      const red = fetch(req).then(r => { if (r.ok) { const c = r.clone(); caches.open(VERSION).then(x => x.put(req, c)); } return r; }).catch(() => hit);
      return hit || red;
    }));
  }
});

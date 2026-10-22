// Service worker de «Qué me pongo».
// Cambia VERSION en cada entrega: así el iPhone detecta la actualización y muestra «Nueva versión disponible».
const VERSION = 'V3.4';
const CACHE = 'qmp-' + VERSION;
const APP = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/apple-touch-icon.png',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(APP)));
  // No se activa solo: espera a que el usuario pulse «Actualizar».
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k.startsWith('qmp-') && k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('message', e => { if (e.data === 'SKIP_WAITING') self.skipWaiting(); });

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // El tiempo (Open-Meteo) lo gestiona la app con su propia caché diaria.
  if (url.origin !== self.location.origin) return;
  if (req.mode === 'navigate') {
    // La app abre siempre desde caché (funciona sin conexión), con o sin ?hoy.
    e.respondWith(caches.match('./index.html').then(r => r || fetch(req)));
    return;
  }
  e.respondWith(caches.match(req, { ignoreSearch: true }).then(r => r || fetch(req)));
});

const CACHE = 'wisi-v2';
const ASSETS = ['/', '/index.html', '/manifest.json'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  const url = e.request.url;

  // Never intercept these — always go straight to network
  if (e.request.method !== 'GET') return;
  if (url.includes('/.netlify/')) return;
  if (url.includes('/share-target')) return;
  if (url.includes('nominatim.openstreetmap.org')) return;
  if (url.includes('corsproxy.io')) return;
  if (url.includes('allorigins.win')) return;
  if (url.includes('codetabs.com')) return;
  if (url.includes('tiktok.com')) return;

  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});

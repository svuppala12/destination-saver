const CACHE = 'wisi-v1';
const ASSETS = ['/', '/index.html', '/manifest.json'];

// Install — cache core assets
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS))
  );
  self.skipWaiting();
});

// Activate — clean old caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch — serve from cache, fall back to network
self.addEventListener('fetch', e => {
  const url = e.request.url;

  // Always pass these straight to the network — never intercept
  if (url.includes('/share-target')) return;
  if (url.includes('/.netlify/')) return;
  if (url.includes('nominatim.openstreetmap.org')) return;
  if (url.includes('allorigins.win')) return;
  if (url.includes('tiktok.com/oembed')) return;
  if (e.request.method !== 'GET') return;

  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});

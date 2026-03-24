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
  // Let share-target requests through to the page
  if (e.request.url.includes('/share-target')) return;

  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});

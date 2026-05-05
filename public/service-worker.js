const CACHE_NAME = "wish-100-v1";
const ASSETS = ["/", "/index.html", "/manifest.json", "/icon-192.png", "/icon-512.png", "/apple-touch-icon.png", "/favicon.png"];
self.addEventListener("install", (e) => { e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS).catch(() => {}))); self.skipWaiting(); });
self.addEventListener("activate", (e) => { e.waitUntil(caches.keys().then(k => Promise.all(k.filter(x => x !== CACHE_NAME).map(x => caches.delete(x))))); self.clients.claim(); });
self.addEventListener("fetch", (e) => { e.respondWith(caches.match(e.request).then(c => c || fetch(e.request).catch(() => caches.match("/")))); });

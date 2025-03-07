const cacheID = "loadUpV1";
const contentToCache = [
    "/index.html",
    "/styles.css",
    "/app.mjs",
    "/icons/training_128.png",
    "/icons/training_512.png"
];

self.addEventListener("install", (evt) => {
    console.log('[Service worker] installed');
    evt.waitUntil((async () => {
        const cache = await caches.open(cacheID);
        console.log('[service worker] Caching all: app shell and content')
        await cache.addAll(contentToCache);
    }))
});

self.addEventListener('fetch', (evt) => {
    if (!(
        evt.request.url.startsWith('http:') || evt.request.url.startsWith('https:')
    )) {
        return;
    }

    evt.respondWith((async () => {
        const r = await caches.match(evt.request);
        console.log(`[Service Worker] Fetching resource: ${evt.request.url}`);
        if (r) { return r; }
        try {
            const response = await fetch(evt.request);
            const cache = await caches.open(cacheID);
            console.log(`[Service Worker] Caching new resource: ${evt.request.url}`);
            cache.put(evt.request, response.clone());
            return response;
        } catch (error) {
            console.error(`[Service Worker] Fetch failed for: ${evt.request.url}`, error);
            throw error;
        }
    })());
});
const cacheID = "jobbquestV1";
const contentToCache = [
    "/index.html",
    "/app.mjs",
    "/icons/career_128.png",
    "/icons/career_512.png",
    "/css/style.css"
];

self.addEventListener("install", (evt) => {
    console.log('service worker has been installed');
    e.waitUntil((async () => {
        const cache = await caches.open(cacheID);
        console.log('[service worker] Caching all: app shell and content')
        await cache.addAll(contentToCache);
    }))
});

self.addEventListener('fetch', (e) => {
    if (!(
        e.request.url.startsWith('http:') || e.request.url.startsWith('https:')
    )) {
        return;
    }

    e.respondWith((async () => {
        const r = await caches.match(e.request);
        console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
        if (r) { return r };
        const response = await fetch(e.request);
        const cache = await caches.open(cacheID);
        console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
        cache.put(e.request, response.clone());
        return response;
    })());
});
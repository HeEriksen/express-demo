const cacheID = "loadUpV1";
const contentToCache = [
  "/index.html",
  "/styles.css",
  "/app.mjs",
  "/Icons/training_128.png",
  "/Icons/training_512.png",
  "/views/fallbackView.html",
];

self.addEventListener("install", (evt) => {
  console.log("[Service worker] installed");
  evt.waitUntil(async () => {
    const cache = await caches.open(cacheID);
    console.log("[service worker] Caching all: app shell and content");
    await cache.addAll(contentToCache);
  });
});

self.addEventListener("fetch", (evt) => {
  if (
    !(
      evt.request.url.startsWith("http:") ||
      evt.request.url.startsWith("https:")
    )
  ) {
    return;
  }

  if (evt.request.url.includes("/api/")) {
    return fetch(evt.request);
  }

  if (evt.request.method !== "GET") {
    return fetch(evt.request);
  }

  evt.respondWith(
    (async () => {
      const cachedResponse = await caches.match(evt.request);
      console.log(`[Service Worker] Fetching resource: ${evt.request.url}`);
      if (cachedResponse) {
        return cachedResponse;
      }
      try {
        const response = await fetch(evt.request);
        const cache = await caches.open(cacheID);
        console.log(
          `[Service Worker] Caching new resource: ${evt.request.url}`
        );
        cache.put(evt.request, response.clone());
        return response;
      } catch (error) {
        console.error(`[Service Worker] Fetch failed for: ${evt.request.url}`);

        //TODO: implementer offline fallback hvis det er tid
        // const fallbackResponse = await caches.match("/fallbackView.html"); 
        // return fallbackResponse;
      }
    })()
  );
});

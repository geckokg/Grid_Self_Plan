const CACHE_NAME = "sgcc-job-pwa-v7";
const BASE_PATH = new URL(self.registration.scope).pathname;
const APP_SHELL = [
  BASE_PATH,
  `${BASE_PATH}index.html`,
  `${BASE_PATH}manifest.json`,
  `${BASE_PATH}icons/icon.svg`
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("message", (event) => {
  if (event.data?.type !== "CACHE_URLS" || !Array.isArray(event.data.urls)) {
    return;
  }

  const urls = event.data.urls.filter((url) => typeof url === "string");
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(urls)));
});

self.addEventListener("fetch", (event) => {
  const request = event.request;

  if (request.method !== "GET") {
    return;
  }

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) {
    return;
  }

  if (isApiRequest(url.pathname)) {
    return;
  }

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(`${BASE_PATH}index.html`, clone));
          return response;
        })
        .catch(() => caches.match(`${BASE_PATH}index.html`))
    );
    return;
  }

  event.respondWith(
    findCachedResponse(request).then((cached) => {
      if (cached) {
        return cached;
      }

      return fetch(request).then((response) => {
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
        }
        return response;
      });
    })
  );
});

async function findCachedResponse(request) {
  const url = new URL(request.url);
  const cache = await caches.open(CACHE_NAME);
  return (await cache.match(request)) || (await cache.match(url.pathname)) || (await cache.match(url.href));
}

function isApiRequest(pathname) {
  const uploadPath = `${BASE_PATH}upload`.replace(/\/+/g, "/");
  return (
    pathname === "/upload" ||
    pathname === uploadPath ||
    pathname === "/health" ||
    pathname.startsWith("/question-bank/") ||
    pathname.startsWith("/sync/") ||
    pathname === "/jobs" ||
    pathname === "/backup/export"
  );
}

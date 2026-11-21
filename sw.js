// Card W2. Offline cache. Every app file is precached at install so the run works with no network.
// Paths are relative to this file, so the app works from any subpath (for example a GitHub Pages project folder).
// Same origin only: backend calls (another origin) never touch the cache.

const VERSION = "hbq-v5";
const FILES = [
  "./", "index.html", "guide.html", "manifest.webmanifest",
  "css/app.css", "css/kid.css", "css/parent.css",
  "data/config.js", "data/shop.js", "data/tasks.js", "data/unlocks.js",
  "js/clock.js", "js/demo.js", "js/router.js", "js/rules.js", "js/setup.js", "js/store.js", "js/sync.js",
  "js/ui/base.js", "js/ui/history.js", "js/ui/homework.js", "js/ui/photo.js", "js/ui/shop.js",
  "js/ui/step.js", "js/ui/tickets.js", "js/ui/today.js", "js/ui/who.js",
  "js/parent/board.js", "js/parent/checks.js", "js/parent/common.js", "js/parent/devices.js",
  "js/parent/editors.js", "js/parent/pin.js", "js/parent/requests.js", "js/parent/settings.js", "js/parent/week.js",
  "vendor/qrcode.mjs",
  "assets/base/base-reference.svg",
  "assets/fonts/atkinson-hyperlegible-400.woff2", "assets/fonts/atkinson-hyperlegible-700.woff2",
  "assets/fonts/OpenDyslexic-Regular.woff",
  "assets/icons/icon.svg", "assets/icons/icon-192.png", "assets/icons/icon-512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(VERSION).then((c) => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith("hbq-") && k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // backend calls go straight to the network
  if (req.mode === "navigate") {
    // The page itself: any query (?demo=) maps to the cached shell; network only when the cache has none.
    event.respondWith(caches.match("index.html", { ignoreSearch: true }).then((hit) => hit || fetch(req)));
    return;
  }
  event.respondWith(
    caches.match(req, { ignoreSearch: true }).then((hit) => hit || fetch(req).then((res) => {
      if (res.ok) {
        const copy = res.clone();
        caches.open(VERSION).then((c) => c.put(req, copy));
      }
      return res;
    }))
  );
});

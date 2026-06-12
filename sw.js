// ══════════════════════════════════════════════════════════════════
//  Service Worker – LogiKron Gare
//  ⚙️  Aggiorna CACHE_NAME ad ogni deploy per forzare il refresh
// ══════════════════════════════════════════════════════════════════

const CACHE_NAME = 'logikron-v5.20';

const STATIC_ASSETS = [
  './',
  './index.html',
  './admin.html',
  './gara.html',
  './tabellone.html',
  './intenzioni.html',
  './iscrizioni.html',
  './regolamento.html',
  './archivio.html',
  './attestati.html',
  './guida-docenti.html',
  './css/style.css',
  './js/config.js',
  './js/api.js',
  './js/math-bg.js',
  './js/confetti.min.js',
  './manifest.json',
  './assets/icon-192.png',
  './assets/icon-512.png',
];

// ── Install: pre-cacha i file statici ─────────────────────────────
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_ASSETS))
  );
});

// ── Activate: elimina cache vecchie e notifica le tab aperte ──────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      const oldKeys = keys.filter(k => k !== CACHE_NAME);
      return Promise.all(oldKeys.map(k => caches.delete(k))).then(() => {
        // Notifica solo se c'era davvero una versione precedente (non al primo avvio)
        if (oldKeys.length > 0) {
          return self.clients.matchAll({ type: 'window' }).then(clients => {
            clients.forEach(client => client.postMessage({ type: 'SW_UPDATED' }));
          });
        }
      });
    })
  );
  self.clients.claim();
});

// ── Fetch: network-first per API backend, cache-first per asset locali ──
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // sw.js stesso: NON intercettare (così il browser scarica sempre la versione aggiornata)
  if (url.pathname.endsWith('/sw.js')) return;

  // Le chiamate al backend Apps Script: NON intercettare.
  // Il JSONP usa <script> tag che il browser carica senza CORS — se il SW fa fetch()
  // la risposta dal redirect (googleusercontent.com) viene bloccata da CORS.
  if (url.hostname.includes('script.google.com') || url.hostname.includes('googleapis.com')
      || url.hostname.includes('googleusercontent.com') || url.hostname.includes('fonts.googleapis.com')
      || url.hostname.includes('fonts.gstatic.com')) {
    return; // Lascia gestire al browser nativamente (nessun event.respondWith)
  }

  // File HTML: network-first (così aggiornamenti arrivano subito senza svuotare cache manualmente)
  if (url.pathname.endsWith('.html') || url.pathname.endsWith('/')) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // CSS, JS, assets: cache-first (cambiano solo con nuovo CACHE_NAME)
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request))
  );
});

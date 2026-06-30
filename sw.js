const CACHE_NAME = 'wallet-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json'
];

// تثبيت الـ Service Worker وحفظ الملفات الأساسية
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// تفعيل واستقبال البيانات (شرط أساسي لظهور زر التثبيت)
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});

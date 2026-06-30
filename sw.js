const CACHE_NAME = 'wallet-v2'; // 👈 غيرنا الرقم هنا من v1 إلى v2 لتحديث الكاش
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './logo.png'                    // 👈 أضفنا شعارك الجديد هنا ليتم حفظه في الجوال
];

// تثبيت الـ Service Worker وحفظ الملفات الأساسية
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// تفعيل واستقبال البيانات
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});

const CACHE_NAME = 'wallet-v2'; // 1. قمنا بتغيير الإصدار إلى v2 لإجبار المتصفح على التحديث
const ASSETS = [
  './',
  './index.html',
  './manifest.json'
];

// تثبيت السيرفس وركر وتحميل الملفات الجديدة
self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS);
        }).then(() => self.skipWaiting()) // إجبار السيرفس وركر الجديد على التنشيط فوراً
    );
});

// 2. دالة التطهير الحاسمة: تحذف كاش 'wallet-v1' القديم تلقائياً من جهاز المستخدم
self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME) {
                        console.log('جاري حذف ذاكرة التخزين المؤقت القديمة:', key);
                        return caches.delete(key);
                    }
                })
            );
        }).then(() => self.clients.claim()) // السيطرة على الصفحات المفتوحة فوراً
    );
});

// استراتيجية جلب البيانات الحالية
self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((response) => {
            return response || fetch(e.request);
        })
    );
});

// PWA Service Worker - Cache-first strategy
const CACHE_NAME = 'campus-pay-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/script.js',
  '/form.html',
  '/payment.html',
  '/terms.html',
  '/manifest.json',
  '/images/hero-bg.jpg',
  '/images/ChatGPT Image Mar 24, 2026, 01_53_50 PM.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});


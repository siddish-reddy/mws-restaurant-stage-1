var cacheName = 'app-v1';
self.addEventListener('install', function(event) {
    console.log(event)
    event.waitUntil(
        caches.open(cacheName).then(function(cache) {
            return cache.addAll(
                [
                    '/',
                    '/index.html',
                    '/restaurant.html',
                    '/css/styles.css',
                    '/js/main.js',
                    '/js/dbhelper.js',
                    '/js/restaurant_info.js',
                    '/data/restaurants.json',
                    '/img/1.jpg',
                    '/img/2.jpg',
                    '/img/3.jpg',
                    '/img/4.jpg',
                    '/img/5.jpg',
                    '/img/6.jpg',
                    '/img/7.jpg',
                    '/img/8.jpg',
                    '/img/9.jpg',
                    '/img/10.jpg',
                ]
            );
        })
        .then(function() {
            console.log('Service worker installed!');
        })
    );
});

self.addEventListener('fetch', function(event) {
    console.log(event.request);
    event.respondWith(caches.match(event.request).then(function(response) {
            return response || caches.open(cacheName).then(function(cache) {
                return fetch(event.request).then(function(response) {
                    console.log('Fethed!');
                    if (response.status === 404) {
                        return new Response("404 Page not found.")
                    }
                    return response;
                });
            });
        })
        .catch(function() {
            console.log('Error occurred!!!');
            return new Response("Oops, theres something wrong, You are visiting page that isn't cached yet!")
        }));
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(cacheNames.filter((cache_name) => {
                return cache_name.startsWith('app-') && cache_name != cacheName;
            }).map((cache_name) => {
                return caches.delete(cache_name);
            }));
        }));
});

// References : Google Fundamentals : https://developers.google.com/web/fundamentals/primers/service-workers/
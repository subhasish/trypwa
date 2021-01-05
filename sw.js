//Service worker

//Cache files
const cacheName = 'cache-v1';
const resourcesToPrecache = [
	'images/icon-192x192.png'
];

//Install event handler - called during registration
//Populate the cache
self.addEventListener('install', event => {
	console.log('Service worker install event!');
	event.waitUntil(
		caches.open(cacheName).then(cache => {
			return cache.addAll(resourcesToPrecache);
		})
	);
});

self.addEventListener('activate', event => {
	console.log('Activate event!');
});

self.addEventListener('fetch', event => {
	console.log('Fetch intercepted for:', event.request.url);
	event.respondWith(caches.match(event.request).then(cachedResponse => {
		return cachedResponse || fetch(event.request); })
	);
});


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
	console.log('Inside activate event!');
});

self.addEventListener('fetch', event => {
	console.log('Fetch intercepted for:', event.request.url);
	event.respondWith(caches.match(event.request).then(cachedResponse => {
		return cachedResponse || fetch(event.request); })
	);
});

self.addEventListener('push', event => {
	const title = 'Yay a new message';
	const body = 'We have received a new message.';
	const icon = '/images/icon-192x192.png';
	const tag = 'simple-push-example-tag';
	event.waitUntil(
		self.registration.showNotification(title, {
			body: body,
			icon: icon,
			tag: tag
		})
	);
});
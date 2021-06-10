//asiganar nombre y version de la cache
const CACHE_NAME = 'v1_cache_victor_suarez_pwa';

//ficheros a cachear en la aplicacion
var urlsToCache  =[
	'./',
	'./css/styles.css',
	'./img/favicon.png',
	'./img/1.png',
	'./img/2.png',
	'./img/3.png',
	'./img/4.png',
	'./img/5.png',
	'./img/6.png',
	'./img/facebook.png',
	'./img/instagram.png',
	'./img/twitter.png',
	'./img/favicon-1024.png',
	'./img/favicon-512.png',
	'./img/favicon-384.png',
	'./img/favicon-256.png',
	'./img/favicon-192.png',
	'./img/favicon-128.png',
	'./img/favicon-96.png',
	'./img/favicon-64.png',
	'./img/favicon-32.png',
	'./img/favicon-16.png'
];


//evento install
// Instalacion del service worker y guardar en cache
self.addEventListener('install', e => {
	e.waitUntil(
		caches.open(CACHE_NAME)
			  .then(cache => {
			  	return cache.addAll(urlsToCache)
			  	            .then(()=>{
			  	            	self.skipWaiting();
			  	            });
			  	            
			  })
			.catch(err=> console.log('Nose ha registrado la cache',err))
    );
});


//evento activate
//que la app funcione sin conexion
self.addEventListener('activate', e => {
	const cacheWhitelist = [CACHE_NAME];

	e.waitUntil(
		caches.keys()
			  .then(cacheNames => {
			    return	Promise.all(
			    	cacheNames.map(cacheName =>{

			    		if(cacheWhitelist.indexOf(cacheName)=== -1){
			    			//borara la cache que no nesecitamos
			    			return caches.delete(cacheName);
			    		}
			    	})
			    );

			  })
			  .then(()=>{
			  	//activar cache en el dispositivo
			  	self.clients.claim();
			  })
	);
});


//evento fetch
 
self.addEventListener('fetch', e=>{

	e.respondWith(
		caches.match(e.request)
			  .then(res=>{
			  	 if(res){
			  		//devuelvo los datos de cache
			  	    return res;
			  	 }
			  	  return fetch(e.request);
			  })		  
	);

});

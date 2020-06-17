const CACHE_NAME = "restaurante-v30";
const caches_urls = [
					 "./offline/view.html", 
					 "./offline/style.css", 
					 "./offline/map.png"
					];

// install : Evento que se dispara la primera vez que se carga la página.
self.addEventListener("install", function(e){
	console.log("instalando");

	caches.open(CACHE_NAME)
		   .then(function(cache){
		   		console.log("Cache opened");
		   		return cache.addAll(caches_urls);
		   })
});

// activate: Evento que se dispara cada ves que se renueva el caché.
self.addEventListener("activate", function(e){
	e.waitUntil(
		caches.keys().then(function(cacheNames){
			// console.log(cacheName);
			return Promise.all(
				cacheNames.map(function(cacheName){
					if(CACHE_NAME !== cacheName){
						return caches.delete(cacheName);
					}
				})
			);
		})
	);
	// console.log("Hola");
});

// fetch : Evento que se dispara cada vez que realizamos una petición al servidor.
self.addEventListener("fetch", function(ev){
	// console.log(ev.request);
	ev.respondWith(
		caches.match(ev.request)
			  .then(function(response){
			  	 if(response){
			  	 	console.log("Estoy en el cache");
			  	 	return response
			  	 }

			  	 console.log("No estoy en el cache");
			  	 return fetch(ev.request);
			  }).catch(function(err){
			  	if(ev.request.mode === "navigate"){
			  		return caches.match("offline/view.html");
			  	}
			  })
	);
});
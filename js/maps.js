(function(){

	class userlocation {
		static get(callback){
			if(navigator.geolocation){
				navigator.geolocation.getCurrentPosition((location) => {
					callback({
						lat: location.coords.latitude,
						lng: location.coords.longitude
					});
				});
			} else{
				alert("No pudimos detectar el lugar en el que te encuentras");				
			}			
		}
	}

	const my_place = {
		lat: -12.102722,
		lng: -76.979065
	};

	google.maps.event.addDomListener(window, "load", () => {
		const map = new google.maps.Map(
			document.getElementById("map"),
			{
				center: my_place,
				zoom: 15
			}
		);


		const marker = new google.maps.Marker({
			map: map,
			position: my_place,
			title: "RestauranteFacilito",
			visible: true
		});


		userlocation.get((coords) => {			
			// Calcular distancia del restaurante al usuario
			let origen = new google.maps.LatLng(coords.lat, coords.lng);
			let destino = new google.maps.LatLng(my_place.lat, my_place.lng);

			let service = new google.maps.DistanceMatrixService();
			service.getDistanceMatrix({
				origins: [origen],
				destinations: [destino],
				travelMode: google.maps.TravelMode.DRIVING
			}, (response, status) => {
				if(status === google.maps.DistanceMatrixStatus.OK){
					const duration_element = response.rows[0].elements[0];
					const duracion_viaje = duration_element.duration.text;

					document.querySelector("#message")
							.innerHTML = `
								Estás a ${duracion_viaje} de una noche inolvidable en
								<span class="dancing-script medium">RestauranteFacilito</span>
							`;

					console.log(duration_element);
				}
			});

		});
	});

}());
if(navigator.serviceWorker){
	navigator.serviceWorker.register("./sw.js")
}

(function(){

	let sticky = false;
	// console.log(window.innerHeight);
	let galleryInner = document.querySelector("#gallery .inner");
	const arrImgs = document.querySelectorAll("#gallery .inner .image");
	const email = "lordbynary@gmail.com";

	let currentPosition = 0;
	let limitMax = 0;

	limitMax = arrImgs.length - 1;
	// console.log(limitMax);

	isOpen();

	document.querySelector("#contactForm").addEventListener("submit", function(e){
		e.preventDefault();

		sendForm($(this));

		return false;
	});

	document.querySelector("#menu-opener").addEventListener("click", toggleNav);

	document.querySelectorAll(".menu-link").forEach((item) => {
		item.addEventListener("click", toggleNav);
	});

	setInterval(() => {
		// galleryInner.setAttribute('style', 'left: -100%');
		if(currentPosition < limitMax){
			currentPosition++;			
		} else {
			currentPosition = 0;
		}

		galleryInner.style.left = `-${currentPosition*100}%`;
		// console.log(`-${currentPosition}00%`);	
	}, 3000);

	window.addEventListener("scroll", () => {
		// console.log("scroll => " + window.scrollY);
		const inBottom = isInBottom();

		if(inBottom && !sticky){
			// Mostrar la navegación sticky
			sticky = true;
			// console.log("Cambiar la navegación");
			stickNavigation();
		}
		if(!inBottom && sticky){
			// Ocultar la navegación sticky
			sticky = false;
			// console.log("Regresar la navegación");
			unStickNavigation();
		}
	});

	function stickNavigation(){
		// tarjeta.classList.remove('active')
		document.querySelector("#description").classList.toggle('fixed');
		document.querySelector("#description").classList.remove('absolute');
		// document.querySelector("#navigation").classList.remove('active');
		// document.querySelector("#navigation").classList.toggle('inactive');
		document.querySelector("#navigation").classList.toggle('hidden');
		// document.querySelector("#sticky-navigation").classList.remove('inactive');
		// document.querySelector("#sticky-navigation").classList.toggle('active');
		document.querySelector("#sticky-navigation").classList.remove('hidden');

	}

	function unStickNavigation(){
		document.querySelector("#description").classList.remove('fixed');
		document.querySelector("#description").classList.toggle('absolute');
		// document.querySelector("#navigation").classList.remove('inactive');
		// document.querySelector("#navigation").classList.toggle('active');
		document.querySelector("#navigation").classList.remove('hidden');
		// document.querySelector("#sticky-navigation").classList.remove('active');
		// document.querySelector("#sticky-navigation").classList.toggle('inactive');
		document.querySelector("#sticky-navigation").classList.toggle('hidden');
	}

	function isInBottom(){
		const $description = document.querySelector("#description"); //$("#description");
		const descriptionHeight = $description.clientHeight; //$description.height();

		// console.log("tamDescrip => " + descriptionHeight);
		return window.scrollY > (window.innerHeight - descriptionHeight);
	}

	function toggleNav(){
		let menu = document.querySelector("#menu-opener");

		document.querySelector("#responsive-nav ul").classList.toggle("active");
		menu.classList.toggle("glyphicon-menu-hamburger");
	}

	function isOpen(){
		// Reloj 24h => 5pm - 11pm => 17 - 23
		let date = new Date();
		const current_hour = date.getHours();		
		if(current_hour < 13 || current_hour > 23){			
			document.querySelector("#is-open .text").innerHTML = 
						`Cerrado ahora <br> 
						 Abierto de 05:00pm a 11:00pm`;
		}
	}

}());
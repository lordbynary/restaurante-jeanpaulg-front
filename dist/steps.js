(function(){

	document.querySelector(".step:nth-child(1)").classList.toggle("active");
	document.querySelector(".path-step:nth-child(1)").classList.toggle("active");

	const selector = "#contactForm";
	const objSelector = document.querySelector(selector);

	document.querySelectorAll(".path-step").forEach((item) => {
		item.addEventListener("click", (e) => {
			const current_circle = e.target;

			focus_circle(current_circle);

			const posicion = getIndex(current_circle);

			let test = document.querySelector(`.step:nth-child(${posicion + 1})`);
			siguiente(test);

			// console.log(posicion);
			
		});
	});

	// console.log(document.querySelector(".step > input[type='textarea']"));
	document.querySelector(".step > input[type='textarea']").addEventListener("keydown", (e) => {
		if(e.keyCode === 13){
			e.preventDefault();

			e.target.blur();

		}
	})

	objSelector.querySelectorAll(".input").forEach((item, i, array) => {
		item.addEventListener("change", (e) => {
			const input = e.target;
			let lengthStep = 0;
			const next_step = e.target.parentNode.nextElementSibling;
			const is_form_valid = es_valido_formulario();

			if(next_step.nodeName.toLowerCase() !== "fieldset"){
				lengthStep = 0;
			} else {
				if(typeof next_step !== "undefined"){
					lengthStep = next_step.innerHTML.length;					
				}else {
					lengthStep = 0;
				}
			}

			// console.log(next_step);
			// console.log(next_step.innerHTML.length);
			if(!is_form_valid && lengthStep > 0){
				siguiente(next_step)
			} else{
				validar_formulario();
			}

		});
	});

	// Helpers

	function validar_formulario(){
		const $form = $(selector);
		if(es_valido_formulario()){
			// enviar_formulario()
			// alert("formulario enviado!");
			$form.slideUp();
			document.querySelector("#info-contacto").innerHTML = "Enviamos tu mensaje, pronto nos pondremos en contacto contigo";

		} else {
			let fieldset_imvalido = objSelector.querySelector(".input:invalid").parentNode;
			siguiente(fieldset_imvalido);
		}
	}

	function es_valido_formulario(){
		return document.querySelector(selector).checkValidity();

	}

	function siguiente(next_step){
		document.querySelector(".step.active").classList.remove("active");
		next_step.classList.toggle("active");
		next_step.children[0].focus();

		// Coordinar los círuclos
		const posicion = getIndex(next_step);
		const circle = document.querySelector(`.path-step:nth-child(${posicion + 1})`);

		focus_circle(circle);

		// document.querySelector(".path-step.active").classList.remove("active");
		// test.classList.toggle("active");
	}

	function getIndex(elem) {
		let ind = -2;

    	[...elem.parentNode.children].some((item, i, array) => {
    		if(item === elem){
    			ind = i;
    		}
    	});

    	return ind;
	}

	function focus_circle(circle){
		document.querySelector(".path-step.active").classList.remove("active");
		circle.classList.toggle("active");
	}

	function enviar_formulario(){
		const $form = document.querySelector(selector);
		// console.log($form.formObject());
		$.ajax({
			url: $form.attr("action"),
			method: "POST",
			data: $form.formObject(),
			dataType: "json",
			success: function(){
				alert("Todo bien");
			}
		});
	}

}());
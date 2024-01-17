const formulario = document.getElementById('formulario'); //Accedemos al id="formulario"
const inputs = document.querySelectorAll('#formulario input'); //Almacenamos en un array todos nuestros inputs del formulario mediante el id="formulario__input para después con un eventListener, cada vez que escribimos en el input hagamos una comprobación y validemos el fomulario"

//--- Declaración de expresiones regulares ---
const expresiones = {
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, //Letras, espacios y acentos.
	email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, // campo + @campo + .campo
    phone: /^\d{7,12}$/ //Solo numeros, de 7 a 12 numeros.
}

const campos = {
	nombre: false,
	email: false,
	phone: false,
    message: false,
}

// --- Función de tipo flecha para cuando se deje de presionar cada tecla o se haga click fuera del input ---
const validarFormulario = (e) => {
	switch (e.target.name) {  //Para identificar cuál de los inputs queremos validar.
		case "nombre":
			validarCampo(expresiones.nombre, e.target, 'nombre'); //Para que lo que estemos escribiendo en este input coincida con su expresión regular
		break;
		case "email":
			validarCampo(expresiones.email, e.target, 'email');
		break;
		case "phone":
			validarCampo(expresiones.phone, e.target, 'phone');
		break;
		case "message":
			validarCampo(expresiones.message, e.target, 'message');
		break;
	}
}
// --- Función flecha para reutilizarla dentro del bucle switch anterior ---
const validarCampo = (expresion, input, campo) => {  //Le pasamos los valores a la función: expresion regular(ej:expresiones.nombre), input(e.target) y campo('nombre', 'phone' etc)
	if(expresion.test(input.value)){  // 
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
		campos[campo] = true;
	} else {
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
		campos[campo] = false;
	}
}

// --- Comprobación cuando usuario escriba o dé un click fuera del input
inputs.forEach((input) => {  //Para que por cada input ejecute un codigo
	input.addEventListener('keyup', validarFormulario); //Al dejar de presionar una tecla queremos que compruebe el campo del input.
	input.addEventListener('blur', validarFormulario); //Cuando demos un click fuera del input que lo compruebe.
});

// --- Comprobación cuando se pulse el btn Enviar ---
formulario.addEventListener('submit', (e) => {  //Para ejecutar la función de enviar formulario
	e.preventDefault();  //Si quisiera enviar los datos a otra pagina esto no se pondría.


	const terminos = document.getElementById('terminos');
	if(campos.nombre && campos.email && campos.phone && campos.message && terminos.checked ){
		formulario.reset();

		document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
		setTimeout(() => {
			document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
		}, 5000);

		document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
			icono.classList.remove('formulario__grupo-correcto');
		});
	} else {
		document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
	}
});

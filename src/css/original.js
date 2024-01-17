const formulario = document.getElementById('formulario'); //Accedemos al id="formulario"
const inputs = document.querySelectorAll('#formulario input'); //Almacenamos en un array todos nuestros inputs del formulario mediante el id="formulario__input para después con un eventListener, cada vez que escribimos en el input hagamos una comprobación y validemos el fomulario"

//--- Declaración de expresiones regulares ---
const expresiones = {
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, //Letras, espacios y acentos.
	email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, // campo + @campo + .campo
    phone: /^\d{7,12}$/ //Solo numeros, de 7 a 12 numeros.
}

//Declaramos un objeto con todos los campos para más tarde comprobar que están rellenados correctamente.
//Al inicio del formulario quieres que todos los cmapos sean false porque todavía no están rellenados.
const campos = {
	nombre: false,
	email: false,
	phone: false,
    message: false //Ojo! El último elemento no lleva la coma.
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
const validarCampo = (expresion, input, campo) => {  //Le pasamos los valores a la función: expresion regular(ej:expresiones.nombre), input(e.target) y camp ('nombre', 'phone' etc)
	if(expresion.test(input.value)){  // 
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
		campos[campo] = true; //Aquí le decimos que valide el campo a true (ya que fueron declarados como false)
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
formulario.addEventListener('submit', (e) => {  //Añado un controlador de eventos al elemento del DOM referenciado por 'formulario'.
	e.preventDefault();  //Evito enviarlo hasta que no compruebe las validaciones. Si quisiera enviar los datos a otra pagina esto no se pondría.

// --- Comprobación de todos los campos para que estén correctos --- 
	const terminos = document.getElementById('terminos'); //Declaramos esta constante asignando el elemento del DOM con el ID 'terminos'para poder validar este campo con .checked
	if(campos.nombre && campos.email && campos.phone && campos.message && terminos.checked ){  //Condicional que verifica si todos los campos son verdaderos.
		formulario.reset(); //Si lacondición es verdadera se resetean todos los campos del formulario.
		
		//Para mostrar el mensaje de enviado correctamente, si los campos son válidos y la casilla de términos está marcada.
		document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
		setTimeout(() => { //Para mostrar el mensaje de éxito
			document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
		}, 5000); //Para ocultar el mensaje de éxito después de 5seg.

		//Para ocultar los iconos de validación correcta.
		document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => { 
			icono.classList.remove('formulario__grupo-correcto');
		});
	} else { //Si la validación falla, muestra el mensaje de error.
		document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
	}
});
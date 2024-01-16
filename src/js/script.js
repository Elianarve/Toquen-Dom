
const instruments = Array.from(document.getElementById("instruments").children); //se crea un array con todos los elementos del div padre

console.log(instruments);

const keyframes = [                             //animacion para que los instrumentos vibren
  { transform: "translate3d(-1px, 0, 0)"},
  { transform: "translate3d(2px, 0, 0)" },
  { transform: "translate3d(-4px, 0, 0)" },
  { transform: " translate3d(4px, 0, 0)" }
];


function playSound(id){      //funcion para pasar el id de los elementos
  if (id == 'img-crash-l' || id == 'r'){                 
      const crashL = document.getElementById("audio-crash");   //si el id de la imagen o el id de la tecla coinciden
      crashL.play();                                           //que resproduzca este sonido 
      const imgCrashL = document.getElementById('img-crash-l'); 
      imgCrashL.animate(keyframes, 200);                        //y a su vez haga esta animacion
  }
  if (id == 'img-crash-r' || id == 'u'){
      const crashR = document.getElementById("audio-crash");
      crashR.play(); 
      const imgCrashR = document.getElementById('img-crash-r');
      imgCrashR.animate(keyframes, 200);  
}
  if (id == 'img-tom-1' || id == 'k'){
     const tomSmall = document.getElementById("audio-tom-base-1");
     tomSmall.play(); 
     const imgTom1 = document.getElementById('img-tom-1');
     imgTom1.animate(keyframes, 200);  
}
  if (id == 'img-small-tom' || id == 'f'){
     const tomSmall = document.getElementById("audio-small-tom");
     tomSmall.play();  
     const smallTom = document.getElementById('img-small-tom');
     smallTom.animate(keyframes, 200); 
}
if (id == 'img-tom-2' || id == 'j'){
     const tom2 = document.getElementById("audio-tom-2");
     tom2.play(); 
     const imgTom2 = document.getElementById('img-tom-2');
     imgTom2.animate(keyframes, 200);  
}
 if (id == 'img-medium-tom' || id == 'h' || id == 'g'){
     const mediumTom = document.getElementById("audio-medium-tom");
     mediumTom.play();  
     const tomMedium = document.getElementById('img-medium-tom');
     tomMedium.animate(keyframes, 200);  
}
  if (id == 'img-bombo' || id == 'b'){
      const bombo = document.getElementById("audio-bombo");
      bombo.play();
      const imgBombo = document.getElementById('img-bombo');
      imgBombo.animate(keyframes, 200); 
  }
  if (id == 'img-snare' || id == 'c' || id == 'v'){
      const snare = document.getElementById("audio-snare");
      snare.play();
      const imgsnare = document.getElementById('img-snare');
      imgsnare.animate(keyframes, 200);
  }
  if (id == 'img-hi-hat-c' || id == 'n'){
      const hhC = document.getElementById("audio-hi-hat-c");
      hhC.play();
      const imghhC = document.getElementById('img-hi-hat-c');
      imghhC.animate(keyframes, 200);
  }
  if (id == 'img-hi-hat-o' || id == 'm'){
      const hhO = document.getElementById("audio-hi-hat-o");
      hhO.play();
      const imghhO = document.getElementById('img-hi-hat-o');
      imghhO.animate(keyframes, 200);
  }
  if (id == 'img-ride' || id == 'i'){
      const ride = document.getElementById("audio-ride");
      ride.play();
      const imgRide = document.getElementById('img-ride');
      imgRide.animate(keyframes, 200);
  }
}

instruments.forEach(item => item.addEventListener("click", ev => { //el evento q va a pasar dentro de la funcion
  console.log(ev);
  playSound(ev.target.id);// <- este es el vento click, cuando demos click q suene
}));

document.addEventListener("keydown", (event) => {
  const keyValue = event.key;
  playSound(keyValue.toLowerCase());     //cuando presionemos las teclas elegidas, haga la vibracion
});



window.palabra;
window.letras = [];
window.letrasAux = [];
window.intentos = [];
window.vidas = 3;
window.pressEnter;
window.erroresInicio;
window.dificultad;
window.candidato;
/*
  RANDOM
  https://www.palabrasque.com/palabra-aleatoria.php?Submit=Nueva+palabra
*/
/*
  Vidios
  https://youtu.be/pbWIbuQUjGw  DB
  https://youtu.be/I9uset1Wlro PTMIRU
  https://youtu.be/Tc4uHI5ab9U //TTP
*/


window.obtenerPalabra = function(){
  var indice = Math.floor((Math.random() * (window.diccionario.length -1)));
  var palabra = window.diccionario[indice];
  //CODIGO EXTRA quitar tildes
    let sinDiacriticos = (function(){
      let de = 'ÁÃÀÄÂÉËÈÊÍÏÌÎÓÖÒÔÚÜÙÛÇáãàäâéëèêíïìîóöòôúüùûç',
          a = 'AAAAAEEEEIIIIOOOOUUUUCAAAAAEEEEIIIIOOOOUUUUC',
          re = new RegExp('['+de+']' , 'ug');

          return texto =>
          texto.replace(
              re,
              match => a.charAt(de.indexOf(match))
            );
          })();
  // FIN CODIGO EXTRA

  return sinDiacriticos(palabra);
};

window.setearDificultad = function (dificultad) {
  ciclo = true;
  while (ciclo) {
    switch (dificultad) {
      case "1":
        palabra = obtenerPalabra();
        if (palabra.length >= 4 && palabra.length <= 7) {
          ciclo = false;
        }
        break;
      case "2":
        palabra = obtenerPalabra();
        if (palabra.length >= 8 && palabra.length <= 11) {
          ciclo = false;
        }
        break;
      case "3":
        palabra = obtenerPalabra();
        if (palabra.length > 11) {
          ciclo = false;
        }
        break;
      default:
        alert("DEFAULT");
    }
  }
  return palabra;
}

window.generarCasillas = function(palabra){
  $("#casillas").empty();
  for (var i = 0; i < palabra.length; i++) {
    window.letras.push(palabra.charAt(i).toUpperCase());
    window.letrasAux.push("_");

    var $div = $("<div></div>");
    $div.addClass("casilla text-white");
    var $h1 = $("<h1></h1>");
    $h1.addClass("letras");
    $h1.append("_");
    $div.append($h1);
    $("#casillas").append($div);
  }
};
window.verificarCasillas = function() {
  var ganaste = true;
  for (var i = 0; i < letrasAux.length; i++) {
    if (letrasAux[i] === "_") {
      var ganaste = false;
    }
  }
  return ganaste;
}

window.intentar = function(intento){
  var correcto = false;
  for (var i = 0; i < window.letras.length; i++) {
    if (intento == window.letras[i]) {
      window.letrasAux[i] = intento;
      correcto = true;
    }
  }
  if (correcto) {
    window.recargarCasillas();
    var $span = $("<span class='mensajeVerde'><b>CORRECTO!</b></span>");
    $(".mensaje").empty();
    $(".mensaje").append($span);
    var snd = document.getElementById("sonidoCorrecto");
    snd.volume = 0.5;
    snd.play();
  } else {
    var $span = $("<span class='mensajeRojo'><b>FALLASTE!</b></span>");
    var snd = document.getElementById("sonidoFuego");
    snd.volume = 1;
    snd.play();
    $(".mensaje").empty();
    $(".mensaje").append($span);
    console.log("Intento Fallido: " + intento);
    vidas = vidas - 1;
    $("#vidas").empty();
    $("#vidas").append('<img src="img/heart64.png" alt=""> '+ vidas + " Vidas");
    switch (vidas) {
      case 2:
        $("#fuego1").show("slow");
        $("#fuego3").show("slow");
        $("#jjccMember1").show();
        $("#jjccMember1").animate({left: '-5%'});
        break;
      case 1:
        $("#fuego2").show();
        $("#fuego4").show();
        $("#fuego5").show();

        $("#fuego2").animate({left: '45%'});
        $("#fuego4").animate({left: '51%'});
        $("#fuego5").animate({left: '42%'});

        $("#feminazi1").show();
        $("#feminazi1").animate({left: '80%'});
        break;
      case 0:
        $("#fuego6").show();
        break;
    }
    if (vidas === 0) {

      window.pressEnter = 3;
      $("#btn_adivinar").attr("disabled", true);
      $("#fondoTransparente").show();
      generarMensajePerdiste();
    }

  }
};

//TODO TERMINAR MSJ PERDISTE
window.generarMensajePerdiste = function () {

  switch (candidato) {
    case "piñera":
      $("#mensajePerdiste").append("<h3 class='palabraPerdiste' >Perdiste :( </h3>");
      $("#mensajePerdiste").append('<img src="img/pierde/piñera_pierde.png" id="piñeraPierde" alt="">');
      break;
    case "trump":
      $("#mensajePerdiste").append("<h3 class='palabraPerdiste' >Perdiste :( </h3>");
      $("#mensajePerdiste").append('<img src="img/pierde/trump_pierde.png" id="piñeraPierde" alt="">');
      break;
    case "bachelet":
      $("#mensajePerdiste").append("<h3 class='palabraPerdiste' >Perdiste :( </h3>");
      $("#mensajePerdiste").append('<img src="img/pierde/bachelet_pierde.png" id="piñeraPierde" alt="">');
      break;
    case "brayan":
      $("#mensajePerdiste").append("<h3 class='palabraPerdiste' >Vamo a Arrestarlo!</h3>");
      $("#mensajePerdiste").append('<img src="img/pierde/brayan_pierde.png" id="piñeraPierde" alt="">');
      break;
    default:

  }

}


window.verificarIntentos = function(intento){
  encontrado = false;
  for (var i = 0; i < intentos.length; i++) {
    if (intentos[i] == intento) {
      encontrado = true;
    }
  }
  if (!encontrado) {
    window.intentos.push(intento);
    window.intentar(intento);
    window.divIntentos();
    if (verificarCasillas()) {
      alert("Ganaste");
      $("#juego_iniciado").hide("slow");
      $('#vidasJuego').hide("slow");
      $('#finish').show();
      window.generarMensajeGanaste();
    }
  } else {
    //console.log(intento + " Existe");
    var $span = $("<span class='mensajeRojo #ffd351'><span class='black-text'><i class='material-icons'>info</i></span> <b>Aviso: </b>"+ "Esta letra " + intento + " ya a sigo ingresada " +"</span>");
    $(".mensaje").empty();
    $(".mensaje").append($span);
    var snd = document.getElementById("sonidoInfo");
    snd.volume = 0.5;
    snd.play();
  }
};

//TODO TERMINAR LOS RESUMENES
window.generarMensajeGanaste = function () {
  switch (candidato) {
    case "piñera":
      $("#finishIzq").append('<img src="img/fondo/piñera_fondo.png" class="piñeraIzq my-auto" alt="">');
      $("#finishCenter").append('<h3>Compatriotas, arriba los corazones que vienen marepotos mejores</h3>');
      $('#finishCenter').append('<iframe width="700" height="394" src="https://www.youtube.com/embed/I9uset1Wlro?controls=0&autoplay=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
      $("body").addClass("apagandoLasLuces");
      break;
    case "trump":
      $("#finishIzq").append('<img src="img/fondo/trump_fondo.png" class="piñeraIzq my-auto" alt="">');
      $("#finishCenter").append('<h3>COMIENZA LA TERCER GUERRA MUNDIAL! :D</h3>');
      $('#finishCenter').append('<iframe width="700" height="394" src="https://www.youtube.com/embed/pbWIbuQUjGw?controls=0&autoplay=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
      $("body").addClass("apagandoLasLuces");
      break;
    case "bachelet":
      $("#finishIzq").append('<img src="img/fondo/bachelet_fondo.png" class="piñeraIzq my-auto" alt="">');
      $("#finishCenter").append('<h3>Estamos trabajando para esto, para darles soluciones completas definitivas... BONO! :D :D</h3>');
      $('#finishCenter').append('<iframe width="700" height="394" src="https://www.youtube.com/embed/Tc4uHI5ab9U?controls=0&start=2&end=57&autoplay=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
      $("body").addClass("apagandoLasLuces");
      break;
    case "brayan":
      $("#finishIzq").append('<img src="img/fondo/tolueno.png" class="piñeraIzq my-auto" alt="">');
      $("#finishCenter").empty();
      $("#finishCenter").append('<h1 class="pt-1">¿Ganaste? :s</h1>');
      $("#finishCenter").append('<h3>No vuelvas a salvarlo plz xd</h3>');
      $("#finishCenter").append('<iframe width="560" height="315" src="https://www.youtube.com/embed/Zo-_NnVGsH8?controls=0&autoplay=1&end=149" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
      $("body").addClass("apagandoLasLuces");
      break;
    default:

  }
};

window.divIntentos = function(){
  $(".intentos").empty();
  var $span = $("<span></span>");
  var spanIntentos = "<b>Letras Intentadas</b><br>";
  for (var i = 0; i < intentos.length; i++) {
      spanIntentos += " " + intentos[i] + " ";
  }
  $span.append(spanIntentos);
  $(".intentos").append($span);
};

window.recargarCasillas = function(){
  $("#casillas").empty();
  for (var i = 0; i < letrasAux.length; i++) {
    var $div = $("<div></div>");
    $div.addClass("casilla text-white");
    var $h1 = $("<h1></h1>");
    $h1.addClass("letras");
    $h1.append(window.letrasAux[i]);
    $div.append($h1);
    $("#casillas").append($div);
  }
};

window.validarIntento = function(intento){
  validado = false;

  if (intento.length == 1) {
    var iunicode = intento.toUpperCase().charCodeAt();
    if ( (iunicode >= 65 && iunicode <= 90) || iunicode == 209 ) {
      validado = true;
    }
  }

  return validado;
};

window.validarPalabraInicio = function(palabra){
  validado = false;
  erroresInicio = [];
  if (palabra != "") {
    for (var i = 0; i < palabra.length; i++) {
      var iunicode = palabra.charAt(i).toUpperCase().charCodeAt();
      if (!( (iunicode >= 65 && iunicode <= 90) || iunicode == 209)) {
        erroresInicio.push(palabra.charAt(i).toUpperCase() + " no es una letra válida");
      }
    }
  }
  if (palabra.length < 4) {
    erroresInicio.push("El largo debe ser mayor a 3");
  }
  if (erroresInicio.length == 0) {
    validado = true;
  }
  return validado;
};

window.generarColgado = function (candidato) {
  switch (candidato) {
    case "piñera":
      $("#piñera").show();
      break;
    case "trump":
      $("#trump").show();
      break;
    case "bachelet":
      $("#bachelet").show();
      break;
    case "brayan":
      $("#brayan").show();
      break;

  }
};

$(document).ready(function(){

  $("#palabraClave").focus();
  window.pressEnter = 1



  // TODO: validar palabra clave
  $("body").on("click", "#btn_iniciar", function(){
    palabra = $("#palabraClave").val();
    if (validarPalabraInicio(palabra)) {
      $('#inicio_juego').hide("slow");
      candidato = $("#candidato").val();
      window.generarColgado(candidato);

      $("#juego_iniciado").show();
      $("#vidasJuego").show();
      $("#palabraClave").val("");
      $("#vidas").append(vidas + " Vidas");
      $("#intento").focus();



      //console.log(palabra);
      window.generarCasillas(palabra);
      window.pressEnter = 2;
    } else {
      $("#cardInicio").empty();
      var $ulErrorInicio = $("<ul></ul>");
      $ulErrorInicio.append("<b>Errores:</b>");
      for (var i = 0; i < erroresInicio.length; i++) {
        $ulErrorInicio.append("<li>"+erroresInicio[i]+"</li>");
      }
      $("#palabraClave").focus();
      $("#cardInicio").append($ulErrorInicio);
    }

  });
  $("body").on("click", "#btn_random_iniciar", function(){
    $('#inicio_juego').hide("slow");
    $("#juego_iniciado").show();
    $("#vidasJuego").show();
    $("#palabraClave").val("");
    $("#vidas").append(vidas + " Vidas");
    $("#intento").focus();
    candidato = $("#candidatoRandom").val();
    window.generarColgado(candidato);

    dificultad = $("#dificultad").val();
    palabra = window.setearDificultad(dificultad);

    window.generarCasillas(palabra);
    window.pressEnter = 2;

  });
  $("body").on("click", "#btn_adivinar", function(){
    $(".mensaje").empty();
    intento = $("#intento").val().toUpperCase();
    $("#intento").val("");

    if (validarIntento(intento)) {
      window.verificarIntentos(intento);
    } else {
      var $span = $("<span class='mensajeRojo'><span class='red-text'><i class='material-icons'>error</i></span> <b>Error: </b>Caracter inválido, intentelo nuevamente.</span> ");
      $(".mensaje").empty();
      $(".mensaje").append($span);
      var snd = document.getElementById("sonidoError");
      snd.volume = 0.5;
      snd.play();
    }
    $("#intento").focus();
  });
  $(document).keypress(function(e) {
    switch (pressEnter) {
      case 1:
      if(e.which == 13) {
        palabra = $("#palabraClave").val();
        if (validarPalabraInicio(palabra)) {
          $('#inicio_juego').hide("slow");
          candidato = $("#candidato").val();
          window.generarColgado(candidato);

          $("#juego_iniciado").show();
          $("#vidasJuego").show();
          $("#palabraClave").val("");
          $("#vidas").append(vidas + " Vidas");
          $("#intento").focus();



          //console.log(palabra);
          window.generarCasillas(palabra);
          window.pressEnter = 2;
        } else {
          $("#cardInicio").empty();
          var $ulErrorInicio = $("<ul></ul>");
          $ulErrorInicio.append("<b>Errores:</b>");
          for (var i = 0; i < erroresInicio.length; i++) {
            $ulErrorInicio.append("<li>"+erroresInicio[i]+"</li>");
          }
          $("#palabraClave").focus();
          $("#cardInicio").append($ulErrorInicio);
        }
      }
        break;
      case 2:
          $(".mensaje").empty();
          if(e.which == 13) {
            intento = $("#intento").val().toUpperCase();
            $("#intento").val("");

            if (validarIntento(intento)) {
              window.verificarIntentos(intento);
            } else {
              var $span = $("<span class='mensajeRojo'><span class='red-text'><i class='material-icons'>error</i></span> <b>Error: </b>Caracter inválido, intentelo nuevamente.</span> ");
              $(".mensaje").empty();
              $(".mensaje").append($span);
              var snd = document.getElementById("sonidoError");
              snd.volume = 0.5;
              snd.play();
            }
            $("#intento").focus();
          }
        break;
      default:

    }
  });

});

window.addEventListener("load", start, false);

function start() {
  const botonEnviar = document.getElementById("enviar");
  const texto = document.getElementById("texto");
  const seleccion = document.getElementsByName("nombreCampos")[0];
  const resultados = document.getElementById("resultados");

  botonEnviar.addEventListener(
    "click",
    () => {
      if (texto.value.length == 0) {
        alert("Debe introducir algún valor");
        return;
      }
      var textoObtenido = texto.value;
      var campoElegido;
      for (let i = 0; i < seleccion.length; i++) {
        if (seleccion[i].selected) {
          campoElegido = seleccion[i].value;
        }
      }
      var htmlRequest = new XMLHttpRequest();
      htmlRequest.open("GET", "datosjson.php", true);
      htmlRequest.addEventListener(
        "load",
        () => {
          var datos = JSON.parse(htmlRequest.responseText);
          renderHTML(datos, campoElegido, textoObtenido);
        },
        false
      );
      htmlRequest.send();
    },
    false
  );

  function renderHTML(datos, campoElegido, textoObtenido) {
    var textoInner =
      "<table border=1><tr><th>Nombre Centro</th><th>Localidad</th><th>Provincia</th><th>Telefono</th><th>Fecha Visita</th><th>Numero Visitantes</th></tr>";
    // // Hacemos un bucle para recorrer todos los objetos literales recibidos en el array resultados y mostrar su contenido.
    const re = (/([%]{1}[A-Za-z0-9]{1})|([%]{1}[A-Za-z0-9]{1}[%]{1})|([A-Za-z0-9]{1}%)/);
    if (!re.test(textoObtenido)) {
      alert("El valor introducido no coincide con lo pedido");
      return;
    }
    var letra = textoObtenido.replace("%", "");
    var opcion = "1";

    if (textoObtenido.length == 3) {
      opcion = "2";
    } else {
      if (textoObtenido.charAt(1) == "%") {
        opcion = "3";
      }
    }
    console.log(letra);
    console.log(opcion);
    for (var objeto of datos) {
      if (parsearCadenaTexto(opcion, objeto[campoElegido]), letra) {
        textoInner +=
          "<tr><td>" +
          objeto.nombrecentro +
          "</td><td>" +
          objeto.localidad +
          "</td><td>" +
          objeto.provincia +
          "</td><td>" +
          objeto.telefono +
          "</td><td>" +
          objeto.fechavisita +
          "</td><td>" +
          objeto.numvisitantes +
          "</td></tr>";
      }
    }
    resultados.innerHTML = textoInner;
  }


  function parsearCadenaTexto(opcion, cadena, letra) {
    console.log(cadena);
    console.log(letra);
    switch (opcion) {
      case "1":
        return cadena.charAt(0).toLowerCase() == letra.toLowerCase();
      case "2":
        return cadena.toLowerCase().includes(letra.toLowerCase());
      case "3":
        return cadena.charAt(cadena.length - 1).toLowerCase() == letra.toLowerCase();
    }
  }
}

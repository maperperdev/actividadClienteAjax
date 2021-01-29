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
    var textoInner = "";
    // // Hacemos un bucle para recorrer todos los objetos literales recibidos en el array resultados y mostrar su contenido.

    console.log(textoInner);
    for (var objeto of datos) {
      if (objeto[campoElegido] == textoObtenido) {
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

    console.log(textoInner);
    if (textoInner.length > 0) {
      textoInner =
        "<table border=1><tr><th>Nombre Centro</th><th>Localidad</th><th>Provincia</th><th>Telefono</th><th>Fecha Visita</th><th>Numero Visitantes</th></tr>" +
        textoInner;
      resultados.innerHTML = textoInner;
    } else {
      resultados.innerHTML = "No existen datos con esa consulta";
    }
  }
}

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
      var campo;
      for (let i = 0; i < seleccion.length; i++) {
        if (seleccion[i].selected) {
          campo = seleccion[i].value;
        }
      }
      var htmlRequest = new XMLHttpRequest();
      const re = /([%]{1}[A-Za-z0-9]{1})|([%]{1}[A-Za-z0-9]{1}[%]{1})|([A-Za-z0-9]{1}%)/;
      if (!re.test(textoObtenido)) {
        alert("El valor introducido no coincide con lo pedido");
        return;
      }
      htmlRequest.open("GET", `datosjson.php?campo=${campo}&valor=${textoObtenido}`, true);
      htmlRequest.addEventListener(
        "load",
        () => {
          var datos = JSON.parse(htmlRequest.responseText);
          renderHTML(datos);
        },
        false
      );
      htmlRequest.send();
    },
    false
  );

  function renderHTML(datos) {
    var textoInner = "";
    // // Hacemos un bucle para recorrer todos los objetos literales recibidos en el array resultados y mostrar su contenido.
    for (var objeto of datos) {
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
    if (textoInner.length == 0) {
      resultados.innerHTML = "No existen resultados";
    } else {
      textoInner =
        "<table border=1><tr><th>Nombre Centro</th><th>Localidad</th><th>Provincia</th><th>Telefono</th><th>Fecha Visita</th><th>Numero Visitantes</th></tr>" +
        textoInner;
      resultados.innerHTML = textoInner;
    }
  }
}

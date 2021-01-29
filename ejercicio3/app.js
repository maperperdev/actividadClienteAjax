window.addEventListener("load", start, false);

function start() {
  const botonEnviar = document.getElementById("enviar");
  const nombreCentroTxt = document.getElementById("nombreCentro");
  const localidadTxt = document.getElementById("localidad");
  const provinciaTxt = document.getElementById("provincia");
  const telefonoTxt = document.getElementById("telefono");
  const fechaVisitasTxt = document.getElementById("fechaVisita");
  const numVisitasTxt = document.getElementById("numVisitas");

  botonEnviar.addEventListener(
    "click",
    () => {
      var nombreCentro = nombreCentroTxt.value;
      var localidad = localidadTxt.value;
      var provincia = provinciaTxt.value;
      var telefono = telefonoTxt.value;
      var fechaVisita = fechaVisitasTxt.value;
      var numVisitas = numVisitasTxt.value;

      var url = `datosjson.php?nombreCentro=${nombreCentro}&localidad=${localidad}&provincia=${provincia}&telefono=${telefono}&fechaVisitas=${fechaVisita}&numVisitas=${numVisitas}`;
     console.log(url) 
      var htmlRequest = new XMLHttpRequest();
      htmlRequest.open("GET", url, true);
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
    var textoInner =
      "<table border=1><tr><th>Nombre Centro</th><th>Localidad</th><th>Provincia</th><th>Telefono</th><th>Fecha Visita</th><th>Numero Visitantes</th></tr>";
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
    resultados.innerHTML = textoInner;
  }
}

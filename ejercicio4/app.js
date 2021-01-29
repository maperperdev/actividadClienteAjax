window.addEventListener("load", start, false);

function start() {
  const botonEnviar = document.getElementById("enviar");
  botonEnviar.addEventListener(
    "click",
    () => {
      cargarCatalogo();
    },
    false
  );

  function cargarCatalogo() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        cargarXML(this);
      }
    };
    xhr.open("GET", "asignaturas.xml", true);
    xhr.send();
  }

  function cargarXML(xml) {
    var docXML = xml.responseXML;
    var tabla =
      "<table><tr><th>Nombre</th><th>Curso</th><th>Número de horas</th><th>Profesor</th></tr>";
    var asignaturas = docXML.getElementsByTagName("asignatura");
    for (var i = 0; i < asignaturas.length; i++) {
      tabla += "<tr><td>";
      tabla += asignaturas[i].getElementsByTagName("nombre")[0].textContent;
      tabla += "</td><td>";
      tabla += asignaturas[i].getElementsByTagName("curso")[0].textContent;
      tabla += "</td><td>";
      tabla += asignaturas[i].getElementsByTagName("horas")[0].textContent;
      tabla += "</td><td>";
      tabla += asignaturas[i].getElementsByTagName("profesor")[0].textContent;
      tabla += "</td></tr>";
    }
    tabla += "</table>";
    document.getElementById("resultados").innerHTML = tabla;
  }
}

window.addEventListener("load", start, false);

function start() {
  const botonEnviar = document.getElementById("enviar");

  const nombre = document.getElementById("nombre");
  const curso = document.getElementById("curso");
  const horas = document.getElementById("horas");
  const profesor = document.getElementById("profesor");

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
    var tabla = "<table><tr>";

    if (nombre.checked) {
      tabla += "<th>Nombre</th>";
    }
    if (curso.checked) {
      tabla += "<th>Curso</th>";
    }
    if (horas.checked) {
      tabla += "<th>Horas</th>";
    }
    if (profesor.checked) {
      tabla += "<th>profesor</th>";
    }
    tabla += "</tr>";

    var asignaturas = docXML.getElementsByTagName("asignatura");
    for (var i = 0; i < asignaturas.length; i++) {
      tabla += "<tr>";
      if (nombre.checked) {
        tabla +=
          "<td>" +
          asignaturas[i].getElementsByTagName("nombre")[0].textContent +
          "</td>";
      }
      if (curso.checked) {
        tabla +=
          "<td>" +
          asignaturas[i].getElementsByTagName("curso")[0].textContent +
          "</td>";
      }
      if (horas.checked) {
        tabla +=
          "<td>" +
          asignaturas[i].getElementsByTagName("horas")[0].textContent +
          "</td>";
      }
      if (profesor.checked) {
        tabla +=
          "<td>" +
          asignaturas[i].getElementsByTagName("profesor")[0].textContent;
        +"</td>";
      }
      tabla += "</tr>";
    }
    tabla += "</table>";
    document.getElementById("resultados").innerHTML = tabla;
  }
}

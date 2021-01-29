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
    xhr.open("GET", "asignaturas.json", true);
    xhr.send();
  }

  function cargarXML(xml) {
    var docXML = JSON.parse(xml.responseText);
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

    for (var i = 0; i < docXML.length; i++) {
      tabla += "<tr>";
      if (nombre.checked) {
        tabla +=
          "<td>" +
          docXML[i].nombre +
          "</td>";
      }
      if (curso.checked) {
        tabla +=
          "<td>" +
           docXML[i].curso 
          "</td>";
      }
      if (horas.checked) {
        tabla +=
          "<td>" +
       docXML[i].horas  
          "</td>";
      }
      if (profesor.checked) {
        tabla +=
          "<td>" +
          docXML[i].profesor
        +"</td>";
      }
      tabla += "</tr>";
    }
    tabla += "</table>";
    document.getElementById("resultados").innerHTML = tabla;
  }
}

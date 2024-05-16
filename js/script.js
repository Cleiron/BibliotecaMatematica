var biblioteca;

function cargaJSON() {
  var request = new XMLHttpRequest();
  request.open("GET", "biblioteca.json", false);
  request.send(null);
  biblioteca = JSON.parse(request.responseText);
}

function eliminaMEPU(cad) {
  //elimina multiples espacios, y primero y ultimo de un string
  cad = cad.replace(/\s+/g, " ");
  if (cad[0] == " ") cad = cad.slice(1);
  if (cad[cad.length - 1] == " ") cad = cad.slice(0, -1);
  return cad;
}

function buscarCoincidencias(valorreal, valorbuscado) {
  if (valorreal == undefined) valorreal = "#####";
  if (Number.isInteger(valorreal)) valorreal = valorreal.toString();
  valorreal = valorreal
    .toLowerCase()
    .replace(/,/g, " ")
    .replace(/\./g, " ")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, ""); //lo transforma a minusculas, reemplaza comas por espacios y normaliza
  valorbuscado = valorbuscado
    .toLowerCase()
    .replace(/,/g, " ")
    .replace(/\./g, " ")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  valorreal = eliminaMEPU(valorreal);
  valorbuscado = eliminaMEPU(valorbuscado);
  palabrasbuscadas = valorbuscado.split(" ");
  for (var i = 0; i < palabrasbuscadas.length; i++) {
    if (!valorreal.includes(palabrasbuscadas[i])) {
      return false;
    }
  }
  return true;
  //console.log(valorreal)
  //console.log(valorbuscado)
  //console.log(palabrasbuscadas)
}

function generarTabla() {
  titulo = document.getElementById("titulo").value;
  autor = document.getElementById("autor").value;
  editorial = document.getElementById("editorial").value;
  anio = document.getElementById("anio").value;
  codigotabla =
    '<div class="row header"><div class="cell">Título</div><div class="cell">Autor/es</div><div class="cell">Editorial</div><div class="cell">Año</div></div>';
  for (var i = 0; i < biblioteca.length; i++) {
    if (
      (titulo == "" || buscarCoincidencias(biblioteca[i].Título, titulo)) &&
      (autor == "" || buscarCoincidencias(biblioteca[i].Autor, autor)) &&
      (editorial == "" ||
        buscarCoincidencias(biblioteca[i].Editorial, editorial)) &&
      (anio == "" || buscarCoincidencias(biblioteca[i].Año, anio))
    ) {
      if (i % 2 == 0) {
        colorfila = "colorfila1";
      } else {
        colorfila = "colorfila2";
      }
      codigotabla +=
        '<div class="row seleccionable"><div class="cell" data-title="Título">' +
        biblioteca[i].Título +
        '</div><div class="cell" data-title="Autor/es">' +
        biblioteca[i].Autor +
        '</div><div class="cell" data-title="Editorial">' +
        biblioteca[i].Editorial +
        '</div><div class="cell" data-title="Año">' +
        biblioteca[i].Año +
        "</div></div>";
    }
  }
  codigotabla += "</table>";
  document.getElementById("catalogo").innerHTML = codigotabla;
}

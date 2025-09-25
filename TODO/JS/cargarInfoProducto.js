// href="/producto.html?id=numero"

async function cargarInfoProducto() {
  const catalogo = await fetch("./data/catalogo.json");

  const datos = await catalogo.json();

  const parametrosUrl = new URLSearchParams(window.location.search);

  if (!parametrosUrl.has("id")) {
    alert("El id no es válido 🚫");
    window.history.back();
  }

  const id = parametrosUrl.get("id");

  if (isNaN(id)) {
    //mejorar validacion
    //document.body.innerHTML = `<h2 style="color:red">Id del producto invalido</h2>`;
    alert("El id no es válido 🚫");
    window.history.back();
  }

  const contenedor = document.getElementById("contenedor-producto");

  if (!contenedor) return;

  const mueble = datos.find((producto) => producto.ID === Number(id));

  if(!mueble){
    alert("El id no es válido 🚫");
    window.history.back();
  }

  //muestro la informacion del producto

  document.title = mueble.nombre + " | Muebleria Hermanos Jota";

  const divImagen = document.createElement("div");
  divImagen.className = "imagen";

  const imagen = document.createElement("img");
  imagen.src = mueble.imagen;
  imagen.alt = mueble.nombre;
  imagen.loading = "lazy";

  divImagen.appendChild(imagen);

  contenedor.appendChild(divImagen);

  const asideInfo = document.createElement("aside");
  asideInfo.className = "info";

  const nombre = document.createElement("h1");
  nombre.className = "nombre";
  nombre.textContent = mueble.nombre;

  const precio = document.createElement("p");
  precio.className = "precio";
  precio.textContent = "$" + mueble.precio;

  const divBotonCta = document.createElement("div");
  divBotonCta.className = "boton-compra";

  const botonCta = document.createElement("button");
  botonCta.className = "button-cta";

  if (mueble.enStock === false) {
    botonCta.textContent = "Agotado";
    botonCta.disabled = mueble.enStock;
  } else {
    botonCta.textContent = "Agregar al carrito";
  }

  divBotonCta.appendChild(botonCta);

  const sectionDescripcion = document.createElement("section");
  sectionDescripcion.className = "descripcion";

  const descripcionTitulo = document.createElement("h2");
  descripcionTitulo.textContent = "Descripcion";

  const textoDescripcion = document.createElement("p");
  textoDescripcion.textContent = mueble.descripcion;

  sectionDescripcion.appendChild(descripcionTitulo);
  sectionDescripcion.appendChild(textoDescripcion);

  const especificaciones = document.createElement("section");
  especificaciones.className = "especificaciones";

  const tituloEspecificaciones = document.createElement("h2");
  tituloEspecificaciones.className = "titulo-especificaciones";
  tituloEspecificaciones.textContent = "Especificaciones";

  especificaciones.appendChild(tituloEspecificaciones);

  const tablaEspecificaicones = document.createElement("table");

  const excluir = [
    "ID",
    "nombre",
    "precio",
    "enStock",
    "descripcion",
    "imagen",
    // "coloresDisponibles",
  ];

  for (let clave in mueble) {
    if (!excluir.includes(clave)) {

        // <tr>
        //     <th>Nombre</th>
        //     <td>Valor</td>
        // </tr>

        const fila = document.createElement("tr");

        const encabezado = document.createElement("th");
        
        if(clave === "coloresDisponibles") {
        
            encabezado.textContent = "Colores disponibles";
        
        }else{
            
            encabezado.textContent = clave.charAt(0).toUpperCase() + clave.slice(1);
        
        }

        const dato = document.createElement("td");
        dato.textContent = mueble[clave];

        fila.appendChild(encabezado);
        fila.appendChild(dato);

        tablaEspecificaicones.appendChild(fila);
    }
  }

  especificaciones.appendChild(tablaEspecificaicones);


  asideInfo.appendChild(nombre);
  asideInfo.appendChild(precio);
  asideInfo.appendChild(divBotonCta);
  asideInfo.appendChild(sectionDescripcion);
  asideInfo.appendChild(especificaciones);

  contenedor.appendChild(asideInfo);

  console.log(mueble);
}

export { cargarInfoProducto };

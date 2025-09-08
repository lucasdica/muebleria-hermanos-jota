import { agregarAlCarrito } from "./agregarAlCarrito.js";
async function cargarDatos() {
  const respuesta = await fetch("./data/catalogo.json");
  const datos = await respuesta.json();

  const contenedor = document.getElementById("seccion-productos");
  if (!contenedor) return;

  datos.forEach((producto) => {
    const div = document.createElement("div");
    div.className = "card";

    const img = document.createElement("img");
    img.src = producto.imagen;
    img.alt = producto.nombre;

    const h2 = document.createElement("h2");
    h2.textContent = producto.nombre;

    const precio = document.createElement("strong");
    precio.textContent = `$${producto.precio}`;

    const boton = document.createElement("button");
    boton.textContent = "Agregar al carrito";
    boton.addEventListener("click", (e) => {
        e.stopPropagation();
        agregarAlCarrito(producto)
    });

    div.addEventListener("click", () => {
      window.location.href = `producto.html?id=${producto.ID}`;
    });

    div.appendChild(img);
    div.appendChild(h2);
    div.appendChild(precio);
    div.appendChild(boton);

    contenedor.appendChild(div);
  });
}

export { cargarDatos };

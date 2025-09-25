let carrito = [];

export function agregarAlCarrito(producto) {
    carrito.push(producto);

    const contador = document.getElementById("contador-carrito");
    if (contador) {
        contador.textContent = carrito.length;
    }

    console.log("Carrito:", carrito);
}

import { useEffect, useState, useContext } from "react";
import Buscador from "../Buscador/Buscador";
import ProductCard from "../Productos/ProductCard";
import { API_URL } from "../config";
import { CartContext } from "../context/CartContext";

function ProductPage() {
  const [productos, setProductos] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);

  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    async function cargarProductos() {
      try {
        const respuesta = await fetch(`${API_URL}`, {
          method: "GET",
          headers: {
            'Accept': "application/json",
            "Content-Type": "application/json",
          },
        });

        if (!respuesta.ok) {
          throw new Error("Error al obtener los productos.");
        }

        const datos = await respuesta.json();
        setProductos(datos);
        setProductosFiltrados(datos);
      } catch (error) {
        console.error("Error cargando productos:", error);
      }
    }
    cargarProductos();
  }, []);

  const filtrarProductos = (query) => {
    const filtrados = productos.filter((producto) =>
      producto.nombre.toLowerCase().includes(query.toLowerCase())
    );
    setProductosFiltrados(filtrados);
  };

  return (
    <div>
      <Buscador filtrarProductos={filtrarProductos} />
      <ProductCard 
        productos={productosFiltrados} 
        agregar={addToCart} 
      />
    </div>
  );
}

export default ProductPage;
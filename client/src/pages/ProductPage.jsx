import { useEffect, useState } from "react";
import Buscador from "../Buscador/Buscador";
import ProductCard from "../Productos/ProductCard";

function ProductPage({ agregar }) {
  const [productos, setProductos] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);

  useEffect(() => {
    async function cargarProductos() {

      const API_URL = import.meta.env.VITE_API_URL;

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
      <ProductCard productos={productosFiltrados} agregar={agregar} />
    </div>
  );
}

export default ProductPage;

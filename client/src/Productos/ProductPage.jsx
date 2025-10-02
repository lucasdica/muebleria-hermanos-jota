import { useEffect, useState } from 'react';
import Buscador from '../Buscador/Buscador';
import ProductCard from './ProductCard';

function ProductPage() {
  const [productos, setProductos] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);

  useEffect(() => {
    async function cargarProductos() {
      try {
        const respuesta = await fetch(import.meta.env.BASE_URL + "/data/catalogo.json");
        const datos = await respuesta.json();
        setProductos(datos);
        setProductosFiltrados(datos);
      } catch (error) {
        console.error('Error cargando productos:', error);
      }
    }

    cargarProductos();
  }, []);

  const filtrarProductos = (query) => {
    const filtrados = productos.filter(producto =>
      producto.nombre.toLowerCase().includes(query.toLowerCase())
    );
    setProductosFiltrados(filtrados);
  };

  return (
    <div>
      <Buscador filtrarProductos={filtrarProductos} />
      <ProductCard productos={productosFiltrados} />
    </div>
  );
}

export default ProductPage;

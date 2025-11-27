import { useNavigate } from "react-router-dom";
import AgregarAlCarrito from '../Carrito/AgregarAlCarrito';
import styles from './ProductCard.module.css';

function ProductCard({ productos, agregar }) {
  const navigate = useNavigate();

  const handleClickProducto = (productoId) => {
    navigate(`/producto/${productoId}`);
  };

  return (
    <div className={styles.productosContainer}>
      {productos.length === 0 ? (
        <p>No se encontraron productos</p>
      ) : (
        productos.map((producto) => (
          <div key={producto._id} className={styles.card}>
            <img src={producto.imagen} alt={producto.nombre} onClick={() => handleClickProducto(producto._id)} />
            <div className={styles.infoProductCard} onClick={() => handleClickProducto(producto._id)}>
              <h3>{producto.nombre}</h3>
              <p>${producto.precio}</p>
            </div>
            <AgregarAlCarrito producto={producto} />
          </div>
        ))
      )}
    </div>
  );
}

export default ProductCard;
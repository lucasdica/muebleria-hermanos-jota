// import { Link } from 'react-router-dom';
// import { HashLink } from 'react-router-hash-link';
import AgregarAlCarrito from '../Carrito/AgregarAlCarrito';
import styles from './ProductCard.module.css';

function ProductCard({ productos }) {
  const handleClickProducto = (productoId) => {
    window.location.href = `/producto.html?id=${productoId}`;
  };

  return (
    <div className={styles.productosContainer}>
      {productos.length === 0 ? (
        <p>No se encontraron productos</p>
      ) : (
        productos.map((producto) => (
          <div
            key={producto.ID}
            className={styles.card}
            onClick={() => handleClickProducto(producto.ID)}
          >
            <img src={producto.imagen} alt={producto.nombre} />
            <div className={styles.infoProductCard}>
              <h3>{producto.nombre}</h3>
              <p>${producto.precio}</p>
            </div>
            <AgregarAlCarrito />
          </div>
        ))
      )}
    </div>
  );
}

export default ProductCard;

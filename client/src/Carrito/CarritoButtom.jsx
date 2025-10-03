import styles from './Carrito.module.css';
import { MdShoppingCart } from 'react-icons/md';

function Carrito({ contador }) {
  return (
    <div className={styles.iconoContainer}>
      <MdShoppingCart className={styles.botonCarrito} />
      <div className={styles.contador}>{contador}</div>
    </div>
  );
}

export default Carrito;
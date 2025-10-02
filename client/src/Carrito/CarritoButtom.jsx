import styles from './Carrito.module.css'
import { MdShoppingCart } from 'react-icons/md';

function Carrito(){
    return (
        <>
            <button>
                <div className={styles.iconoContainer}>
                    <MdShoppingCart className={styles.botonCarrito} />
                    <div className={styles.contador}>0</div>
                </div>
            </button>       
        </>
    )
}

export default Carrito
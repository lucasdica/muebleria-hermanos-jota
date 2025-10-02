import styles from './AgregarAlCarrito.module.css'
import { MdShoppingCart } from 'react-icons/md';

function AgregarAlCarrito(){
    return (
        <>
            <button>
                <MdShoppingCart className={styles.botonCarrito} /> Agregar al carrito
            </button>       
        </>
    )
}

export default AgregarAlCarrito
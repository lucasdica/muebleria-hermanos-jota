import styles from './AgregarAlCarrito.module.css'
import { FaCartPlus } from "react-icons/fa";

function AgregarAlCarrito({ agregar }){
    return (
        <button className={styles.botonAgregarCarrito} onClick={agregar}>
            <FaCartPlus className={styles.iconAgregarCarrito} />
        </button>
    )
}

export default AgregarAlCarrito;
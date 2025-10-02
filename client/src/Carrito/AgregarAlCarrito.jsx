import styles from './AgregarAlCarrito.module.css'
import { FaCartPlus } from "react-icons/fa";

function AgregarAlCarrito(){
    return (
        <>
            <button className={styles.botonAgregarCarrito}>
                <FaCartPlus className={styles.iconAgregarCarrito} />
            </button>       
        </>
    )
}

export default AgregarAlCarrito
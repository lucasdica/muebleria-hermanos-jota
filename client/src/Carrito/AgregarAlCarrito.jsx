// import styles from './AgregarAlCarrito.module.css'
// import { FaCartPlus } from "react-icons/fa";

// function AgregarAlCarrito({ agregar }){
//     return (
//         <button className={styles.botonAgregarCarrito} onClick={agregar}>
//             <FaCartPlus className={styles.iconAgregarCarrito} />
//         </button>
//     )
// }

// export default AgregarAlCarrito;

import styles from './AgregarAlCarrito.module.css';
import { FaCartPlus } from "react-icons/fa";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function AgregarAlCarrito({ producto }) {
    const { addToCart } = useContext(CartContext);

    return (
        <button className={styles.botonAgregarCarrito}
                onClick={() => addToCart(producto)}>
            <FaCartPlus className={styles.iconAgregarCarrito} />
        </button>
    );
}

export default AgregarAlCarrito;
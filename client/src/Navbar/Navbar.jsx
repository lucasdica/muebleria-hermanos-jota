import { useState } from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { FaBars, FaTimes } from "react-icons/fa"; 
import styles from './navbar.module.css';
import Carrito from '../Carrito/CarritoButtom';

function Navbar(){
    const [open, setOpen] = useState(false);

    return(
        <nav className={styles.navbar}>
            
            {/* Botón hamburguesa en mobile */}
            <button 
                className={styles.hamburger} 
                onClick={() => setOpen(!open)}
            >
                {open ? <FaTimes /> : <FaBars />}
            </button>

            <a href="/" className={styles.logo}>
                <img 
                  src="https://lucasdica.github.io/productos-hermanos-jota/productos-images/logo.svg" 
                  alt="Logo de Muebleria Hermanos Jota"
                />
                <h2>Hermanos Jota</h2>
            </a>

            {/* Menú (oculto en mobile) */}
            <ul className={`${styles.menu} ${open ? styles.open : ""}`}>
                <li><HashLink smooth to="/#inicio">Inicio</HashLink></li>
                <li><HashLink smooth to="/#destacado">Destacado</HashLink></li>
                <li><HashLink smooth to="/#nosotros">Nosotros</HashLink></li>
                <li><Link to="/productos">Productos</Link></li>
                <li><Link to="/contacto">Contacto</Link></li>
                <li className={styles.carritoWrapper}>
                    <Link to="/compra"><Carrito /></Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar;
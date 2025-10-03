import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { FaBars, FaTimes } from "react-icons/fa"; 
import { useState } from 'react';
import styles from './navbar.module.css';
import Carrito from '../Carrito/CarritoButtom';

function Navbar({ contador }) {
  const [open, setOpen] = useState(false);

  return (
    <nav className={styles.navbar}>
      {/* Botón hamburguesa */}
      <button className={styles.hamburger} onClick={() => setOpen(!open)}>
        {open ? <FaTimes /> : <FaBars />}
      </button>

      <Link to="/" className={styles.logo}>
        <img src="https://lucasdica.github.io/productos-hermanos-jota/productos-images/logo.svg" alt="Logo"/>
        <h2>Hermanos Jota</h2>
      </Link>

      <ul className={`${styles.menu} ${open ? styles.open : ""}`}>
        <li><HashLink smooth to="/#inicio">Inicio</HashLink></li>
        <li><HashLink smooth to="/#destacado">Destacado</HashLink></li>
        <li><HashLink smooth to="/#nosotros">Nosotros</HashLink></li>
        <li><Link to="/productos">Productos</Link></li>
        <li><Link to="/contacto">Contacto</Link></li>

        <li className={styles.carritoWrapper}>
          <Link to="/compra"><Carrito contador={contador} /></Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { FaBars, FaTimes } from "react-icons/fa";
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import styles from "./navbar.module.css";
import CarritoButtom from "../Carrito/CarritoButtom";

function Navbar() {
  const [open, setOpen] = useState(false);
  const { token, logout, usuario } = useContext(AuthContext);
  const { totalCantidad } = useContext(CartContext);

  return (
    <nav className={styles.navbar}>
      <button className={styles.hamburger} onClick={() => setOpen(!open)}>
        {open ? <FaTimes /> : <FaBars />}
      </button>

      <Link to="/" className={styles.logo}>
        <img
          src="https://lucasdica.github.io/productos-hermanos-jota/productos-images/logo.svg"
          alt="Logo"
        />
        <h2>Hermanos Jota</h2>
      </Link>

      <ul className={`${styles.menu} ${open ? styles.open : ""}`}>
        <li><HashLink smooth to="/#inicio">Inicio</HashLink></li>
        <li><Link to="/productos">Productos</Link></li>
        <li><Link to="/contacto">Contacto</Link></li>

        {token ? (
          <div className={styles.loginRegister}>
            <li><Link to="/perfil">{usuario?.nombre}</Link></li>
            <li>/</li>
            <li onClick={logout}><a>Cerrar sesión</a></li>
          </div>
        ) : (
          <div className={styles.loginRegister}>
            <li><Link to="/login">Iniciar sesión</Link></li>
            <li>/</li>
            <li><Link to="/registro">Registrarse</Link></li>
          </div>
        )}

        <li className={styles.carritoWrapper}>
          <Link to="/compra">
            <CarritoButtom contador={totalCantidad} />
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
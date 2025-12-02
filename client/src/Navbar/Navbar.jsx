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
  const { jwtUsuario, logout, usuario } = useContext(AuthContext);
  const { totalCantidad } = useContext(CartContext);

  // link al perfil: tomamos usuario.id o usuario._id como fallback
  const perfilId = usuario?.id || usuario?._id;

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

        {jwtUsuario ? (
          <div className={styles.loginRegister}>
            <li><Link to={`/perfil/${perfilId}`}>{usuario?.nombre || "Perfil"}</Link></li>
            <li>/</li>
            <li>
              <button onClick={logout} className={styles.logoutButton}>
                Cerrar sesión
              </button>
            </li>
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
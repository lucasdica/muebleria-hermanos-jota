import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import styles from './navbar.module.css';
import Carrito from '../Carrito/CarritoButtom';

function Navbar(){
    return(
        <nav className={styles.navbar}>
            <a href="/">
                <div className={styles.logo}>
                    
                    <img src="https://lucasdica.github.io/productos-hermanos-jota/productos-images/logo.svg" alt="Logo de Muebleria Hermanos Jota"/>
                    <h2>Hermanos Jota</h2>
                    
                </div>
            </a>
            <ul>
                <li><HashLink smooth to="/#inicio">Inicio</HashLink></li>
                <li><HashLink smooth to="/#destacado">Destacado</HashLink></li>
                <li><HashLink smooth to="/#nosotros">Nosotros</HashLink></li>
                <li><Link to="/productos">Productos</Link></li>
                <li><Link to="/contacto">Contacto</Link></li>
                <Link to="/compra"><Carrito /></Link>
            </ul>
        </nav>
    )
}

export default Navbar;
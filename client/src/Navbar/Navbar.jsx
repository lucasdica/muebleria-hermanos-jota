import styles from './navbar.module.css';

function Navbar(){
    return(
        <>
            <nav className={styles.navbar}>
                <div className={styles.logo}>
                    <img src="https://lucasdica.github.io/productos-hermanos-jota/productos-images/logo.svg" alt="Logo de Muebleria Hermanos Jota"/>
                    <h2>Hermanos Jota</h2>
                </div>
                <ul>
                    <li><a href="#inicio">Inicio</a></li>
                    <li><a href="#destacado">Destacado</a></li>
                    <li><a href="#nosotros">Nosotros</a></li>
                    <li><a href="./productos.html">Productos</a></li>
                    <li><a href="./contacto.html">Contacto</a></li>
                </ul>
            </nav>
        </>
    )
}

export default Navbar
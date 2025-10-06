import styles from './ProductosDestacados.module.css';
import ProductoDestacado from './ProductoDestacado';
import { Link } from 'react-router-dom';

function ProductosDestacados(){
    return(
        <>
            <section id="destacado" className={styles.productosDestacados}>
                <h2>Muebles Destacados</h2>
                <ProductoDestacado/>
                <button className={styles.buttonCta}><Link to="/productos">Comprar Muebles</Link></button>
            </section>
        </>
    )
}

export default ProductosDestacados
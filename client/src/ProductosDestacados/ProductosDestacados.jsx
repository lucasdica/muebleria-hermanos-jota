import styles from './ProductosDestacados.module.css';
import ProductoDestacado from './ProductoDestacado';
import { Link } from 'react-router-dom';

function ProductosDestacados(){
    return(
        <>
            <section id="destacado" className={styles.productosDestacados}>
                <h2>Muebles Destacados</h2>
                <ProductoDestacado/>
                <Link to="/productos" className={styles.buttonCta}>Comprar Muebles</Link>
            </section>
        </>
    )
}

export default ProductosDestacados
import styles from './ProductosDestacados.module.css';
import ProductoDestacado from './ProductoDestacado';

function ProductosDestacados(){
    return(
        <>
            <section id="destacado" className={styles.productosDestacados}>
                <h2>Muebles Destacados</h2>
                <ProductoDestacado/>
            </section>
        </>
    )
}

export default ProductosDestacados
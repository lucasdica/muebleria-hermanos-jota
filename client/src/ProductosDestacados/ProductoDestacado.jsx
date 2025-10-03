import { useEffect, useState } from 'react';
import styles from './ProductoDestacado.module.css';

function ProductoDestacado() {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        cargarProductosDestacados();
    }, []);

    async function cargarProductosDestacados() {
        try {
            const respuesta = await fetch(import.meta.env.BASE_URL + "/data/catalogo.json"); 
            const datos = await respuesta.json();
            setProductos(datos.slice(0, 4));
        } catch (error) {
            console.error('Error cargando productos:', error);
        }
    }

    return(
        <div className={styles.productosContainer}>
            {productos.length === 0 ? (
                <p>Cargando productos...</p>
            ) : (
                productos.map((producto) => (
                    <div className={styles.card}>
                        <img src={producto.imagen} alt={producto.nombre} />
                        <h3>{producto.nombre}</h3>
                    </div>
                ))
            )}
        </div>
    )
}

export default ProductoDestacado;
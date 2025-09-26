import { useEffect, useState } from 'react';
import styles from './ProductoDestacado.module.css';

function ProductoDestacado() {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        cargarProductosDestacados();
    }, []);

    async function cargarProductosDestacados() {
        try {
            const respuesta = await fetch("/data/catalogo.json"); 
            const datos = await respuesta.json();
            setProductos(datos.slice(0, 4));
        } catch (error) {
            console.error('Error cargando productos:', error);
        }
    }

    const handleClickProducto = (productoId) => {
        // Navegación a la página de detalle
        window.location.href = `/producto.html?id=${productoId}`;
    };

    return(
        <div className={styles.productosContainer}>
            {productos.length === 0 ? (
                <p>Cargando productos...</p>
            ) : (
                productos.map((producto) => (
                    <div 
                        key={producto.ID} 
                        className={styles.card}
                        onClick={() => handleClickProducto(producto.ID)}
                    >
                        <img src={producto.imagen} alt={producto.nombre} />
                        <h3>{producto.nombre}</h3>
                    </div>
                ))
            )}
        </div>
    )
}

export default ProductoDestacado;
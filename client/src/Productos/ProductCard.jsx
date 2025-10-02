import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { useEffect, useState } from 'react';
import styles from './ProductCard.module.css'
import AgregarAlCarrito from '../Carrito/AgregarAlCarritoButtom';

function ProductCard() {
 const [productos, setProductos] = useState([]);

    useEffect(() => {
        cargarProductos();
    }, []);

    async function cargarProductos() {
        try {
            const respuesta = await fetch(import.meta.env.BASE_URL + "/data/catalogo.json"); 
            const datos = await respuesta.json();
            setProductos(datos);
            // setProductos(datos.slice(0, 1))
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
                        <div className={styles.infoProductCard}>
                            <h3>{producto.nombre}</h3>
                            <p>${producto.precio}</p>
                        </div>
                        <AgregarAlCarrito />
                    </div>
                ))
            )}
        </div>
    )
}

export default ProductCard
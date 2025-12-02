import { useEffect, useState } from 'react';
import styles from './ProductoDestacado.module.css';
import { API_PRODUCTOS } from "../config";

function ProductoDestacado() {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        cargarProductosDestacados();
    }, []);
    
    async function cargarProductosDestacados() {
        try {
            const respuesta = await fetch(`${API_PRODUCTOS}/destacados`, {
                method: "GET",
                headers: {
                    'Accept': "application/json",
                    "Content-Type": "application/json",
                },
            });

            if (!respuesta.ok) {
                throw new Error("Error al obtener los productos.");
            }

            const datos = await respuesta.json();
            setProductos(datos);
        } catch (error) {
            console.error("Error cargando productos:", error);
        }
    }  

    return (
        <div className={styles.productosContainer}>
            {productos.length === 0 ? (
                <p>Cargando productos...</p>
            ) : (
                productos.map((producto) => (
                    <div className={styles.card} key={producto._id}>
                        <img src={producto.imagen} alt={producto.nombre} />
                        <h3>{producto.nombre}</h3>
                    </div>
                ))
            )}
        </div>
    );
}

export default ProductoDestacado;
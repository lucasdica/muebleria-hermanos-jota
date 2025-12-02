import { useEffect, useState } from 'react';
import styles from './ProductoDestacado.module.css';
import { API_PRODUCTOS } from "../config";

function ProductoDestacado() {
    const [datos, setProductos] = useState([]);

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

            const data = await respuesta.json();

            setProductos(Array.isArray(data.destacados) ? data.destacados : []);

        } catch (error) {
            console.error("Error cargando productos:", error);
        }
    }

    return (
        <div className={styles.productosContainer}>
            {datos.length === 0 ? (
                <p>Cargando productos...</p>
            ) : (
                datos.map((producto) => (
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
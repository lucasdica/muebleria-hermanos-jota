import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./ProductDetail.module.css"
import AgregarAlCarrito from "../Carrito/AgregarAlCarrito";

function ProductDetail() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducto() {
      try {
        const respuesta = await fetch(import.meta.env.BASE_URL + "/data/catalogo.json");
        const datos = await respuesta.json();

        if (!id || isNaN(id)) {
          setError("ID no válido");
          return;
        }

        const mueble = datos.find((p) => p.ID === Number(id));

        if (!mueble) {
          setError("Producto no encontrado");
          return;
        }

        document.title = `${mueble.nombre} | Muebleria Hermanos Jota`;
        setProducto(mueble);
      } catch (err) {
        console.error(err);
        setError("Error al cargar el producto");
      }
    }

    fetchProducto();
  }, [id]);

  if (error) return <h2>{error}</h2>;
  if (!producto) return <h2>Cargando producto...</h2>;

  const excluir = ["ID", "nombre", "precio", "enStock", "descripcion", "imagen"];

  return (
    <div className={styles.contenedorProducto}>
      {/* Imagen */}
      <div className={styles.image}>
        <img src={producto.imagen} alt={producto.nombre} className={styles.imagen} loading="lazy" />
      </div>

      {/* Información */}
      <aside className={styles.info}>
        <h1 className={styles.nombre}>{producto.nombre}</h1>
        <div className={styles.precioComprar}>
          <p className={styles.precio}>${producto.precio}</p>
          <button className={styles.botonCta} disabled={!producto.enStock}>
            <AgregarAlCarrito  />
          </button>
        </div>

        {/* Descripción */}
        <section className={styles.descripcion}>
          <h2>Descripción</h2>  
          <p>{producto.descripcion}</p>
        </section>

        {/* Especificaciones */}
        <section className={styles.especificaciones}>
          <h2 className={styles.tituloEspecificaciones}>Especificaciones</h2>
          <table>
            <tbody>
              {Object.entries(producto).map(([clave, valor]) => {
                if (excluir.includes(clave)) return null;
                return (
                  <tr key={clave}>
                    <th>
                      {clave === "coloresDisponibles"
                        ? "Colores disponibles"
                        : clave.charAt(0).toUpperCase() + clave.slice(1)}
                    </th>
                    <td>{Array.isArray(valor) ? valor.join(", ") : valor}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
      </aside>
    </div>
  );
}

export default ProductDetail;


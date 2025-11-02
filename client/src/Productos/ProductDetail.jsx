import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { RiDeleteBin2Line, RiEdit2Line } from "react-icons/ri";
import styles from "./ProductDetail.module.css";
import AgregarAlCarrito from "../Carrito/AgregarAlCarrito";
import ModalEditarProducto from "../ModalEditarProducto/ModalEditarProducto";
import ModalEliminarProducto from "../ModalEliminarProducto/ModalEliminarProducto";
import { API_URL } from "../config";

function ProductDetail({ agregar }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null);
  const [error, setError] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);

  useEffect(() => {
    async function fetchProducto() {

      try {
        const respuesta = await fetch(`${API_URL}/${id}`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        });

        const mueble = await respuesta.json();

        //console.log(mueble.status);

        //if (mueble.error.includes('Cast to ObjectId failed for value')) {
        if (mueble.status === 400) {
          setError("ID no válido");
          return;
        }

        //if (mueble.error.includes('No se encontro el producto')) {
        if (mueble.status === 404) {
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

  const handleGuardarCambios = async (productoEditado) => {
    try {
      const respuesta = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productoEditado),
      });

      if (!respuesta.ok) {
        throw new Error("Error al actualizar el producto");
      }

      const productoActualizado = await respuesta.json();
      setProducto(productoActualizado);

      alert("Producto actualizado correctamente.");
      // navigate("/productos");
      window.location.href = `${API_URL}/${id}`;
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
      alert("Hubo un problema al actualizar el producto.");
    }
  };


  const handleEliminarProducto = async () => {
    try {
      const respuesta = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!respuesta.ok) {
        throw new Error("Error al eliminar el producto");
      }

      alert(`El producto "${producto.nombre}" fue eliminado.`);
      navigate("/productos");
    } catch (error) {
      console.error("Error eliminando producto:", error);
      alert("Hubo un problema al eliminar el producto.");
    }
  };

  if (error) return <h2>{error}</h2>;
  if (!producto) return <h2>Cargando producto...</h2>;

  const excluir = ["_id", "nombre", "precio", "enStock", "descripcion", "imagen"];

  return (
    <div className={styles.contenedorProducto}>
      {/* Imagen */}
      <div className={styles.image}>
        <img
          src={producto.imagen}
          alt={producto.nombre}
          className={styles.imagen}
          loading="lazy"
        />
      </div>

      {/* Información */}
      <aside className={styles.info}>
        <div className={styles.header}>
          <h1 className={styles.nombre}>{producto.nombre}</h1>
        </div>

        <div className={styles.precioComprar}>
          <p className={styles.precio}>${producto.precio}</p>
          <div className={styles.botonCta} disabled={!producto.enStock}>
            <AgregarAlCarrito agregar={agregar} />
          </div>
        </div>

        <section className={styles.descripcion}>
          <h2>Descripción</h2>
          <p>{producto.descripcion}</p>
        </section>

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
        {/* Editar o Eliminar */}
        <section className={styles.edicion}>
          <div className={styles.icon_delete} onClick={() => setMostrarModalEliminar(true)}>
            <RiDeleteBin2Line className={styles.icon} />
            <span className={styles.icon_text}>Eliminar</span>
          </div>
          <div className={styles.icon_edit} onClick={() => setMostrarModal(true)}>
            <RiEdit2Line className={styles.icon} />
            <span className={styles.icon_text}>Editar</span>
          </div>
        </section>
      </aside>

      {mostrarModal && (
        <ModalEditarProducto
          producto={producto}
          onClose={() => setMostrarModal(false)}
          onSave={handleGuardarCambios}
        />
      )}

      {mostrarModalEliminar && (
        <ModalEliminarProducto
          producto={producto}
          onClose={() => setMostrarModalEliminar(false)}
          onConfirm={handleEliminarProducto}
        />
      )}
    </div>
  );
}

export default ProductDetail
// import { useState } from "react";
// import styles from "./ModalEliminarProducto.module.css";

// const ModalEliminarProducto = ({ producto, onClose, onConfirm }) => {

//   const[eliminarProducto, setEliminarProducto] = useState([]);

//   async function deleteProduct(id) {
//     try {
//       const respuesta = await fetch(`/api/productos/${id}`, {
//         method: "DELETE",
//       });

//       if (!respuesta.ok) {
//         throw new Error("Error al eliminar producto");
//       }

//       // Filtramos el producto eliminado del estado local
//       setEliminarProducto((prev) => prev.filter((producto) => producto.id !== id));
//       // console.log(`Producto con ID ${id} eliminado correctamente`);
//       alert(`El producto "${producto.nombre}" fue eliminado.`);
//       navigate("/productos");
//     } catch (error) {
//       console.error("Error eliminando producto:", error);
//     }
//   }

//   return (
//     <div className={styles.overlay}>
//       <div className={styles.modal}>
//         <h3>¿Eliminar producto?</h3>
//         <p>
//           Estás a punto de eliminar <strong>{producto.nombre}</strong>.
//           <br />  
//           Esta acción no se puede deshacer.
//         </p>

//         <div className={styles.botones}>
//           <button onClick={onConfirm} className={styles.btnConfirmar}>
//             Sí, eliminar
//           </button>
//           <button onClick={onClose} className={styles.btnCancelar}>
//             Cancelar
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ModalEliminarProducto;

import styles from "./ModalEliminarProducto.module.css";

const ModalEliminarProducto = ({ producto, onClose, onConfirm }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h3>¿Eliminar producto?</h3>
        <p>
          Estás a punto de eliminar <strong>{producto.nombre}</strong>.
          <br />
          Esta acción no se puede deshacer.
        </p>

        <div className={styles.botones}>
          <button onClick={onConfirm} className={styles.btnConfirmar}>
            Sí, eliminar
          </button>
          <button onClick={onClose} className={styles.btnCancelar}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalEliminarProducto;
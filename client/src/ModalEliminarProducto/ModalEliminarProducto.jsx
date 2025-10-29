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
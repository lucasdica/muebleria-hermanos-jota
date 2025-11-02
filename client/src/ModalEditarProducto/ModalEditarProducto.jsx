import { useState, useEffect } from "react";
import styles from "./ModalEditarProducto.module.css";

const ModalEditarProducto = ({ producto, onClose, onSave }) => {
  const [formData, setFormData] = useState({ ...producto });

  useEffect(() => {
    setFormData({ ...producto });
  }, [producto]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSave(formData);
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Editar producto</h2>

        <form onSubmit={handleSubmit}>
          <label>Nombre</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre || ""}
            onChange={handleChange}
          />

          <label>Precio</label>
          <input
            type="number"
            name="precio"
            value={formData.precio || ""}
            onChange={handleChange}
          />

          <label>Descripción</label>
          <textarea
            name="descripcion"
            value={formData.descripcion || ""}
            onChange={handleChange}
          />

          <label>Imagen (URL)</label>
          <input
            type="text"
            name="imagen"
            value={formData.imagen || ""}
            onChange={handleChange}
          />

          <div className={styles.botones}>
            <button type="submit" className={styles.btnSubmit}>
              Guardar cambios
            </button>
            <button
              type="button"
              onClick={onClose}
              className={styles.btnCancel}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalEditarProducto;
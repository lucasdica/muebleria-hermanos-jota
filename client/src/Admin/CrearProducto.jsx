import styles from './CrearProducto.module.css';
// import mongoose from "mongoose";
import { useState } from "react";
import { API_URL } from "../config";

function CrearProducto() {
  const [formProducto, setFormProducto] = useState({
    nombre: '',
    precio: '',
    enStock: false,
    coloresDisponibles: '',
    medidas: '',
    materiales: '',
    acabado: '',
    peso: '',
    certificacion: '',
    descripcion: '',
    imagen: '',
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormProducto(prevState => ({
      ...prevState,
      [name]: type === 'number' ? Number(value) : value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${API_URL}`, {
        method: 'POST',
        headers: {
          'Accept': "application/json",
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formProducto),
      });

      if (!response.ok) {
        throw new Error('El registro falló.');
      }

      const result = await response.json();
      alert(`¡Registro exitoso para ${result.nombre}!`);
      setFormProducto({ nombre: '', precio: '', enStock: false, coloresDisponibles: '', medidas: '', materiales: '', acabado: '', peso: '', certificacion: '', descripcion: '', imagen: '', });

    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className={styles.formProducto_container}>
      <h1>Crear nuevo producto</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.grupo}>
          <div className={styles.campos}>
            <label htmlFor="nombre">Nombre: </label>
            <input
              type="text"
              name="nombre"
              value={formProducto.nombre}
              onChange={handleChange}
            />
          </div>
          <div className={styles.campos}>
            <label htmlFor="precio">Precio: </label>
            <input
              type="number"
              name="precio"
              value={formProducto.precio}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className={styles.grupo}>
          <div>
            <label htmlFor="enStock">¿El producto está disponible? </label>
            <input
              type="checkbox"
              name="enStock"
              checked={formProducto.enStock}
              onChange={(e) =>
                setFormProducto(prev => ({
                  ...prev,
                  enStock: e.target.checked,
                }))
              }
            />
          </div>
          <div className={styles.campos}>
            <label htmlFor="coloresDisponibles">Colores: </label>
            <input
              type="text"
              name="coloresDisponibles"
              value={formProducto.coloresDisponibles}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className={styles.grupo}>
          <div className={styles.campos}>
            <label htmlFor="medidas">Medidas: </label>
            <input
              type="text"
              name="medidas"
              value={formProducto.medidas}
              onChange={handleChange}
            />
          </div>
          <div className={styles.campos}>
            <label htmlFor="materiales">Materiales: </label>
            <input
              type="text"
              name="materiales"
              value={formProducto.materiales}
              onChange={handleChange}
            />
          </div>
          <div className={styles.campos}>
            <label htmlFor="acabado">Acabado: </label>
            <input
              type="text"
              name="acabado"
              value={formProducto.acabado}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className={styles.grupo}>
          <div className={styles.campos}>
            <label htmlFor="peso">Peso: </label>
            <input
              type="number"
              name="peso"
              value={formProducto.peso}
              onChange={handleChange}
            />
          </div>
          <div className={styles.campos}>
            <label htmlFor="certificacion">Certificación: </label>
            <input
              type="text"
              name="certificacion"
              value={formProducto.certificacion}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className={styles.campos}>
          <label htmlFor="descripcion">Descripción: </label>
          <input
            type="text"
            name="descripcion"
            value={formProducto.descripcion}
            onChange={handleChange}
          />
        </div>
        <div className={styles.campos}>
          <label htmlFor="imagen">URL de la imagen: </label>
          <input
            type="text"
            name="imagen"
            value={formProducto.imagen}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Crear Producto</button>
      </form>
    </div>
  );
}

export default CrearProducto
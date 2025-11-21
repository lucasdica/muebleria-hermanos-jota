import React, { useState } from "react";
import styles from "../Register/Register.module.css";
import { API_URL } from "../config";

const Register = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const enviarFormulario = async (evento) => {
    evento.preventDefault();

    try {
      const respuesta = await fetch(`${API_URL}/usuarios`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre,
          apellido,
          email,
          password,
        }),
      });

      if (!respuesta.ok) {
        throw new Error("Error en el registro");
      }

      alert("¡Registro exitoso!");

      setNombre("");
      setApellido("");
      setEmail("");
      setPassword("");

    } catch (error) {
      console.error("Error al enviar formulario:", error);
      alert("Hubo un problema al registrar el usuario.");
    }
  };

  return (
    <main className={styles["contenedor-registro"]}>
      <h1>Registrarse</h1>

      <form onSubmit={enviarFormulario}>
        <div className={styles["fila-formulario"]}>
          
          <div className={styles["grupo-formulario"]}>
            <label htmlFor="nombre">Nombre:</label>
            <input
              type="text"
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>

          <div className={styles["grupo-formulario"]}>
            <label htmlFor="apellido">Apellido:</label>
            <input
              type="text"
              id="apellido"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              required
            />
          </div>

          <div className={styles["grupo-formulario"]}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className={styles["grupo-formulario"]}>
            <label htmlFor="contrasena">Contraseña:</label>
            <input
              type="password"
              id="contrasena"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

        </div>

        <button type="submit">Enviar</button>
      </form>
    </main>
  );
};

export default Register;
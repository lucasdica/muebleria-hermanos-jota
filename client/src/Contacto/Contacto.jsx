import React, { useState } from "react";
import estilos from "./Contacto.module.css";

const Contacto = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");

  const enviarFormulario = (evento) => {
    evento.preventDefault();
    console.log({
      nombre,
      email,
      mensaje,
    });
    alert("¡Formulario enviado!");
    setNombre("");
    setEmail("");
    setMensaje("");
  };

  return (
    <main className={estilos["contenedor-contacto"]}>
      <h1>Contacto</h1>
      <p>Nuestros clientes suelen tener preguntas. Déjanos tus dudas en el siguiente formulario:</p>

      <form onSubmit={enviarFormulario}>
        <div className={estilos["fila-formulario"]}>
          <div className={estilos["grupo-formulario"]}>
            <label htmlFor="nombre">Nombre:</label>
            <input
              type="text"
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>
          <div className={estilos["grupo-formulario"]}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>
        <div className={estilos["grupo-formulario"]}>
          <label htmlFor="mensaje">Mensaje:</label>
          <textarea
            id="mensaje"
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
          />
        </div>
        <button type="submit">Enviar</button>
      </form>
    </main>
  );
};

export default Contacto;
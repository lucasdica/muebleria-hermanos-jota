import React, { useEffect, useState } from "react";
import styles from "../Profile/Profile.module.css";

const Profile = () => {
  const [usuario, setUsuario] = useState(null);
  const [imagenPreview, setImagenPreview] = useState(null);
  const [imagenFile, setImagenFile] = useState(null);

  useEffect(() => {
    obtenerUsuario();
  }, []);

  const obtenerUsuario = async () => {
    try {
      const respuesta = await fetch(`${API_URL}`);

      const data = await respuesta.json();
      setUsuario(data);
      setImagenPreview("https://lucasdica.github.io/productos-hermanos-jota/productos-images/profileDefault.png");
    } catch (error) {
      console.error("Error al cargar usuario:", error);
    }
  };

  const manejarCambioImagen = (e) => {
    const archivo = e.target.files[0];
    if (!archivo) return;

    setImagenFile(archivo);
    setImagenPreview(URL.createObjectURL(archivo));
  };

  const guardarCambios = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nombre", usuario.nombre);
    formData.append("apellido", usuario.apellido);
    formData.append("email", usuario.email);

    if (imagenFile) {
      formData.append("fotoPerfil", imagenFile);
    }

    try {
      const respuesta = await fetch(`${API_URL}`, {
        method: "PUT",
        body: formData,
      });

      if (!respuesta.ok) throw new Error("Error al actualizar");

      alert("Perfil actualizado correctamente");

    } catch (error) {
      console.error("Error:", error);
      alert("No se pudo actualizar el perfil");
    }
  };

  if (!usuario) return <p>Cargando...</p>;

  return (
    <main className={styles.contenedor}>
      <h1>Mi Perfil</h1>

      <form onSubmit={guardarCambios} className={styles.formulario}>

        {/* FOTO DE PERFIL */}
        <div className={styles.contenedorFoto}>
          <img
            src={imagenPreview}
            alt="Foto de perfil"
            className={styles.foto}
          />
          <label className={styles.botonSubir}>
            Cambiar foto
            <input type="file" accept="image/*" onChange={manejarCambioImagen} hidden />
          </label>
        </div>

        {/* DATOS */}
        <div className={styles.grupo}>
          <label>Nombre:</label>
          <input
            type="text"
            value={usuario.nombre}
            onChange={(e) => setUsuario({ ...usuario, nombre: e.target.value })}
          />
        </div>

        <div className={styles.grupo}>
          <label>Apellido:</label>
          <input
            type="text"
            value={usuario.apellido}
            onChange={(e) => setUsuario({ ...usuario, apellido: e.target.value })}
          />
        </div>

        <div className={styles.grupo}>
          <label>Email:</label>
          <input
            type="email"
            value={usuario.email}
            onChange={(e) => setUsuario({ ...usuario, email: e.target.value })}
          />
        </div>

        <button type="submit" className={styles.botonGuardar}>Guardar cambios</button>
      </form>
    </main>
  );
};

export default Profile;
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import styles from "../Profile/Profile.module.css";
import { API_USUARIOS } from "../config";

const Profile = () => {
  const { usuario: usuarioContext, jwtUsuario} = useContext(AuthContext);
  const [usuario, setUsuario] = useState(null);
  const [imagenPreview, setImagenPreview] = useState(null);
  const [imagenFile, setImagenFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (usuarioContext) {
      setUsuario(usuarioContext);
      setImagenPreview("https://lucasdica.github.io/productos-hermanos-jota/productos-images/profileDefault.png");
    }
  }, [usuarioContext]);

  const manejarCambioImagen = (e) => {
    const archivo = e.target.files[0];
    if (!archivo) return;

    setImagenFile(archivo);
    setImagenPreview(URL.createObjectURL(archivo));
  };

  const guardarCambios = async (e) => {
    e.preventDefault();

    const idUsuario = usuario?.id || usuario?._id;
    if (!usuario || !idUsuario) {
      alert("Usuario no válido");
      return;
    }

    setLoading(true);

    try {
      let body;
      let headers = {
        Authorization: `Bearer ${jwtUsuario}`,
      };

      if (imagenFile) {
        body = new FormData();
        body.append("nombre", usuario.nombre);
        body.append("apellido", usuario.apellido);
        body.append("email", usuario.email);
        body.append("clave", usuario.password || "");
        body.append("fotoPerfil", imagenFile);
      } else {
        body = JSON.stringify({
          nombre: usuario.nombre,
          apellido: usuario.apellido,
          email: usuario.email,
          clave: usuario.password || "",
        });
        headers["Content-Type"] = "application/json";
      }

      const respuesta = await fetch(`${API_USUARIOS}/actualizarUsuario`, {
        method: "PUT",
        headers,
        body,
      });

      if (!respuesta.ok) {
        const errData = await respuesta.json().catch(() => null);
        throw new Error(errData?.mensaje || "Error al actualizar");
      }

      const data = await respuesta.json();

      const usuarioNormalizado = data && (data.id || data._id) ? { ...data, id: data._id || data.id } : usuario;
      setUsuario(usuarioNormalizado);
      localStorage.setItem("usuario", JSON.stringify(usuarioNormalizado));

      alert("Perfil actualizado correctamente");
    } catch (error) {
      console.error("Error al actualizar perfil:", error);
      alert("No se pudo actualizar el perfil");
    } finally {
      setLoading(false);
    }
  };

  if (!usuario) return <p>Cargando...</p>;

  return (
    <main className={styles.contenedor}>
      <h1>Mi Perfil</h1>

      <form onSubmit={guardarCambios} className={styles.formulario}>
        {/* FOTO DE PERFIL */}
        <div className={styles.contenedorFoto}>
          <img src={imagenPreview} alt="Foto de perfil" className={styles.foto} />
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
            value={usuario.nombre || ""}
            onChange={(e) => setUsuario({ ...usuario, nombre: e.target.value })}
          />
        </div>

        <div className={styles.grupo}>
          <label>Apellido:</label>
          <input
            type="text"
            value={usuario.apellido || ""}
            onChange={(e) => setUsuario({ ...usuario, apellido: e.target.value })}
          />
        </div>

        <div className={styles.grupo}>
          <label>Email:</label>
          <input
            type="email"
            value={usuario.email || ""}
            onChange={(e) => setUsuario({ ...usuario, email: e.target.value })}
          />
        </div>

        <div className={styles.grupo}>
          <label>Contraseña:</label>
          <input
            type="password"
            value={usuario.password || ""}
            onChange={(e) => setUsuario({ ...usuario, password: e.target.value })}
          />
        </div>

        <button type="submit" className={styles.botonGuardar} disabled={loading}>
          {loading ? "Guardando..." : "Guardar cambios"}
        </button>
      </form>
    </main>
  );
};

export default Profile;
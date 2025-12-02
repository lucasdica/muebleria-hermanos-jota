// import React, { useContext, useState, useEffect } from "react";
// import { AuthContext } from "../context/AuthContext";
// import styles from "../Profile/Profile.module.css";
// import { API_USUARIOS } from "../config";

// const Profile = () => {
//   const { usuario: usuarioContext, jwtUsuario, logout } = useContext(AuthContext);
//   const [usuario, setUsuario] = useState(null);
//   const [imagenPreview, setImagenPreview] = useState(null);
//   const [imagenFile, setImagenFile] = useState(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (usuarioContext) {
//       setUsuario(usuarioContext);
//       setImagenPreview(
//         usuarioContext.fotoPerfil ||
//           "https://lucasdica.github.io/productos-hermanos-jota/productos-images/profileDefault.png"
//       );
//     }
//   }, [usuarioContext]);

//   const manejarCambioImagen = (e) => {
//     const archivo = e.target.files[0];
//     if (!archivo) return;

//     setImagenFile(archivo);
//     setImagenPreview(URL.createObjectURL(archivo));
//   };

//   const guardarCambios = async (e) => {
//     e.preventDefault();

//     // usamos usuario.id o usuario._id como fallback
//     const idUsuario = usuario?.id || usuario?._id;
//     if (!usuario || !idUsuario) {
//       alert("Usuario no válido");
//       return;
//     }

//     setLoading(true);

//     try {
//       let body;
//       let headers = {
//         Authorization: `Bearer ${jwtUsuario}`,
//       };

//       // Tu backend en rutas espera PUT a /actualizarUsuario (sin :id)
//       // y el controlador aún no está terminado, pero llamamos correctamente
//       // Si más adelante tu backend acepta multipart/form-data, esto funcionará.
//       if (imagenFile) {
//         body = new FormData();
//         body.append("nombre", usuario.nombre);
//         body.append("apellido", usuario.apellido);
//         body.append("email", usuario.email);
//         // backend usa 'clave' en vez de 'password'
//         body.append("clave", usuario.password || "");
//         body.append("fotoPerfil", imagenFile);
//       } else {
//         body = JSON.stringify({
//           nombre: usuario.nombre,
//           apellido: usuario.apellido,
//           email: usuario.email,
//           clave: usuario.password || "",
//         });
//         headers["Content-Type"] = "application/json";
//       }

//       const respuesta = await fetch(`${API_USUARIOS}/actualizarUsuario`, {
//         method: "PUT",
//         headers,
//         body,
//       });

//       if (!respuesta.ok) {
//         // Si el backend devuelve JSON de error:
//         const errData = await respuesta.json().catch(() => null);
//         throw new Error(errData?.mensaje || "Error al actualizar");
//       }

//       const data = await respuesta.json();

//       // si backend retorna el usuario actualizado (o al menos un objeto), normalizamos
//       const usuarioNormalizado = data && (data.id || data._id) ? { ...data, id: data._id || data.id } : usuario;
//       setUsuario(usuarioNormalizado);
//       localStorage.setItem("usuario", JSON.stringify(usuarioNormalizado));

//       alert("Perfil actualizado correctamente");
//     } catch (error) {
//       console.error("Error al actualizar perfil:", error);
//       alert("No se pudo actualizar el perfil");
//       // si hay problema de autenticación token expirado: cerramos sesión
//       // (si querés, podés detectar codigo 401/403 desde la respuesta y llamar logout())
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!usuario) return <p>Cargando...</p>;

//   return (
//     <main className={styles.contenedor}>
//       <h1>Mi Perfil</h1>

//       <form onSubmit={guardarCambios} className={styles.formulario}>
//         {/* FOTO DE PERFIL */}
//         <div className={styles.contenedorFoto}>
//           <img src={imagenPreview} alt="Foto de perfil" className={styles.foto} />
//           <label className={styles.botonSubir}>
//             Cambiar foto
//             <input type="file" accept="image/*" onChange={manejarCambioImagen} hidden />
//           </label>
//         </div>

//         {/* DATOS */}
//         <div className={styles.grupo}>
//           <label>Nombre:</label>
//           <input
//             type="text"
//             value={usuario.nombre || ""}
//             onChange={(e) => setUsuario({ ...usuario, nombre: e.target.value })}
//           />
//         </div>

//         <div className={styles.grupo}>
//           <label>Apellido:</label>
//           <input
//             type="text"
//             value={usuario.apellido || ""}
//             onChange={(e) => setUsuario({ ...usuario, apellido: e.target.value })}
//           />
//         </div>

//         <div className={styles.grupo}>
//           <label>Email:</label>
//           <input
//             type="email"
//             value={usuario.email || ""}
//             onChange={(e) => setUsuario({ ...usuario, email: e.target.value })}
//           />
//         </div>

//         <div className={styles.grupo}>
//           <label>Contraseña:</label>
//           <input
//             type="password"
//             value={usuario.password || ""}
//             onChange={(e) => setUsuario({ ...usuario, password: e.target.value })}
//           />
//         </div>

//         <button type="submit" className={styles.botonGuardar} disabled={loading}>
//           {loading ? "Guardando..." : "Guardar cambios"}
//         </button>
//       </form>
//     </main>
//   );
// };

// export default Profile;

import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useParams, useNavigate } from "react-router-dom"; // Agrega useParams y useNavigate
import styles from "../Profile/Profile.module.css";
import { API_USUARIOS } from "../config";

const Profile = () => {
  const { id } = useParams(); // Obtiene el ID de la URL
  const navigate = useNavigate(); // Para redirigir si hay error
  const { usuario: usuarioContext, jwtUsuario, logout } = useContext(AuthContext);
  const [usuario, setUsuario] = useState(null);
  const [imagenPreview, setImagenPreview] = useState(null);
  const [imagenFile, setImagenFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarPerfil = async () => {
      setCargando(true);
      
      // Verificar si el usuario está viendo su propio perfil
      const idUsuarioContext = usuarioContext?.id || usuarioContext?._id;
      
      // Si no hay usuario logueado o no coincide con el perfil solicitado
      if (!jwtUsuario || !idUsuarioContext) {
        navigate("/login");
        return;
      }

      // Verificar si el usuario está intentando ver su propio perfil
      if (idUsuarioContext !== id) {
        alert("Solo puedes ver tu propio perfil");
        navigate(`/perfil/${idUsuarioContext}`);
        return;
      }

      try {
        // Intentar cargar desde el backend
        const respuesta = await fetch(`${API_USUARIOS}/perfil/${id}`, {
          headers: {
            Authorization: `Bearer ${jwtUsuario}`,
          },
        });

        if (respuesta.ok) {
          const data = await respuesta.json();
          const usuarioNormalizado = { ...data, id: data._id || data.id };
          setUsuario(usuarioNormalizado);
          setImagenPreview(
            usuarioNormalizado.fotoPerfil ||
              "https://lucasdica.github.io/productos-hermanos-jota/productos-images/profileDefault.png"
          );
        } else {
          // Si falla, usar datos del contexto
          if (usuarioContext) {
            setUsuario(usuarioContext);
            setImagenPreview(
              usuarioContext.fotoPerfil ||
                "https://lucasdica.github.io/productos-hermanos-jota/productos-images/profileDefault.png"
            );
          } else {
            navigate("/login");
          }
        }
      } catch (error) {
        console.error("Error al cargar perfil:", error);
        // Si hay error, usar datos del contexto
        if (usuarioContext) {
          setUsuario(usuarioContext);
          setImagenPreview(
            usuarioContext.fotoPerfil ||
              "https://lucasdica.github.io/productos-hermanos-jota/productos-images/profileDefault.png"
          );
        }
      } finally {
        setCargando(false);
      }
    };

    cargarPerfil();
  }, [id, jwtUsuario, usuarioContext, navigate]);

  const manejarCambioImagen = (e) => {
    const archivo = e.target.files[0];
    if (!archivo) return;

    setImagenFile(archivo);
    setImagenPreview(URL.createObjectURL(archivo));
  };

  const guardarCambios = async (e) => {
    e.preventDefault();

    // Usamos el id del parámetro de la URL
    if (!usuario || !id || !jwtUsuario) {
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
        body.append("nombre", usuario.nombre || "");
        body.append("apellido", usuario.apellido || "");
        body.append("email", usuario.email || "");
        body.append("clave", usuario.password || "");
        body.append("fotoPerfil", imagenFile);
      } else {
        body = JSON.stringify({
          nombre: usuario.nombre || "",
          apellido: usuario.apellido || "",
          email: usuario.email || "",
          clave: usuario.password || "",
        });
        headers["Content-Type"] = "application/json";
      }

      // Usar el ID del usuario actual desde la URL
      const respuesta = await fetch(`${API_USUARIOS}/actualizarUsuario/${id}`, {
        method: "PUT",
        headers,
        body,
      });

      if (!respuesta.ok) {
        const errData = await respuesta.json().catch(() => null);
        throw new Error(errData?.mensaje || "Error al actualizar");
      }

      const data = await respuesta.json();
      
      // Actualizar usuario en contexto y localStorage
      const usuarioActualizado = { ...data, id: data._id || data.id };
      setUsuario(usuarioActualizado);
      
      // Actualizar localStorage y contexto
      localStorage.setItem("usuario", JSON.stringify(usuarioActualizado));
      
      // Recargar la página para actualizar datos del contexto
      window.location.reload();
      
      alert("Perfil actualizado correctamente");
    } catch (error) {
      console.error("Error al actualizar perfil:", error);
      alert(error.message || "No se pudo actualizar el perfil");
      
      // Si hay error de autenticación (401), cerrar sesión
      if (error.message.includes("401") || error.message.includes("autenticación")) {
        logout();
      }
    } finally {
      setLoading(false);
    }
  };

  if (cargando) return <div className={styles.cargando}><p>Cargando perfil...</p></div>;
  if (!usuario) return <div className={styles.error}><p>No se pudo cargar el perfil</p></div>;

  return (
    <main className={styles.contenedor}>
      <h1>Mi Perfil</h1>
      <p className={styles.idUsuario}>ID: {id}</p>

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
          <label>Contraseña (dejar en blanco para no cambiar):</label>
          <input
            type="password"
            placeholder="Nueva contraseña"
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
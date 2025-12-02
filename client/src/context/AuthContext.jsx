import { createContext, useEffect, useState } from "react";
import { API_USUARIOS } from "../config";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const storedUsuario = JSON.parse(localStorage.getItem("usuario")) || null;
  const [usuario, setUsuario] = useState(
    storedUsuario ? (storedUsuario.id ? storedUsuario : { ...storedUsuario, id: storedUsuario._id }) : null
  );

  const [jwtUsuario, setJwtUsuario] = useState(localStorage.getItem("jwtUsuario") || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarUsuario = async () => {
      if (!jwtUsuario) {
        setUsuario(null);
        setLoading(false);
        return;
      }

      try {
        const usuarioGuardado = JSON.parse(localStorage.getItem("usuario"));

        // Si no tenemos un id válido guardado, cerramos sesión
        if (!usuarioGuardado?.id && !usuarioGuardado?._id) {
          logout();
          setLoading(false);
          return;
        }

        const idParaUsar = usuarioGuardado.id || usuarioGuardado._id;

        const res = await fetch(`${API_USUARIOS}/perfil/${idParaUsar}`, {
          headers: {
            Authorization: `Bearer ${jwtUsuario}`,
          },
        });

        if (!res.ok) {
          // si el token expiró o hay problema, tirar logout
          throw new Error("Error al obtener usuario");
        }

        const data = await res.json();

        const usuarioNormalizado = { ...data, id: data._id || data.id };

        setUsuario(usuarioNormalizado);
        localStorage.setItem("usuario", JSON.stringify(usuarioNormalizado));
      } catch (error) {
        console.error("Error al obtener usuario", error);
        logout();
      } finally {
        setLoading(false);
      }
    };

    cargarUsuario();
  }, [jwtUsuario]);

  // login: guardamos token y usuario (el usuario puede venir con .id)
  const login = (jwt, usuarioRecibido) => {
    const usuarioNormalizado = usuarioRecibido
      ? { ...usuarioRecibido, id: usuarioRecibido.id || usuarioRecibido._id }
      : null;

    localStorage.setItem("jwtUsuario", jwt);
    if (usuarioNormalizado) {
      localStorage.setItem("usuario", JSON.stringify(usuarioNormalizado));
    } else {
      localStorage.removeItem("usuario");
    }

    setJwtUsuario(jwt);
    setUsuario(usuarioNormalizado);
  };

  const logout = () => {
    localStorage.removeItem("jwtUsuario");
    localStorage.removeItem("usuario");
    setJwtUsuario(null);
    setUsuario(null);
  };

  return (
    <AuthContext.Provider
      value={{ usuario, jwtUsuario, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
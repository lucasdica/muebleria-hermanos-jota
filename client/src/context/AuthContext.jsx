import { createContext, useEffect, useState } from "react";
import { API_USUARIOS } from "../config";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(JSON.parse(localStorage.getItem("usuario")) || null);
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

        if (!usuarioGuardado?.id) {
          logout();
          setLoading(false);
          return;
        }

        const res = await fetch(`${API_USUARIOS}/perfil/${usuarioGuardado.id}`, {
          headers: {
            Authorization: `Bearer ${jwtUsuario}`,
          },
        });

        if (!res.ok) throw new Error("Error al obtener usuario");

        const data = await res.json();
        setUsuario({ ...data, id: data._id });

        localStorage.setItem("usuario", JSON.stringify({ ...data, id: data._id }));
      } catch (error) {
        console.error("Error al obtener usuario", error);
        logout();
      } finally {
        setLoading(false);
      }
    };

    cargarUsuario();
  }, [jwtUsuario]);

  const login = (jwt, usuario) => {
    localStorage.setItem("jwtUsuario", jwt);
    localStorage.setItem("usuario", JSON.stringify(usuario));

    setJwtUsuario(jwt);
    setUsuario(usuario);
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
import { createContext, useEffect, useState } from "react";
import { API_USUARIOS } from "../config";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarUsuario = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${API_USUARIOS}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Error al obtener usuarios");

        const data = await res.json();

        // const usuarioGuardado = JSON.parse(localStorage.getItem("usuario"));

        // if (usuarioGuardado) {
        //   const usuarioActual = data.find(u => u.email === usuarioGuardado.email);
        //   setUsuario(usuarioActual || null);
        // } else {
        //   setUsuario(null);
        // }
        
        const usuarioGuardado = JSON.parse(localStorage.getItem("usuario"));
        setUsuario(usuarioGuardado || null);


      } catch (error) {
        console.error("Error al obtener usuario", error);
        logout();
      } finally {
        setLoading(false);
      }
    };

    cargarUsuario();
  }, [token]);

  const login = (token, usuario) => {
    localStorage.setItem("token", token);
    localStorage.setItem("usuario", JSON.stringify(usuario));
    setToken(token);
    setUsuario(usuario);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    setToken(null);
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext
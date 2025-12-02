import { createContext, useEffect, useState } from "react";
import { API_USUARIOS } from "../config";
import { useParams} from "react-router-dom";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [jwtUsuario, setjwtUsuario] = useState(localStorage.getItem("jwtUsuario") || null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();


  useEffect(() => {
    const cargarUsuario = async () => {
      if (!jwtUsuario) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${API_USUARIOS}/perfil/${id}`, {
          headers: {
            Authorization: `Bearer ${jwtUsuario}`,
          },
        });

        if (!res.ok) throw new Error("Error al obtener usuarios");

        const data = await res.json();

        const usuarioGuardado = JSON.parse(localStorage.getItem("usuario"));

        if (usuarioGuardado) {
          const usuarioActual = data.find(u => u.email === usuarioGuardado.email);
          setUsuario(usuarioActual || null);
        } else {
          setUsuario(null);
        }

      } catch (error) {
        console.error("Error al obtener usuario", error);
        logout();
      } finally {
        setLoading(false);
      }
    };

    cargarUsuario();
  }, [jwtUsuario]);

  const login = (jwtUsuario, usuario) => {
    localStorage.setItem("jwtUsuario", jwtUsuario);
    localStorage.setItem("usuario", JSON.stringify(usuario));
    setjwtUsuario(jwtUsuario);
    setUsuario(usuario);
  };

  const logout = () => {
    localStorage.removeItem("jwtUsuario");
    localStorage.removeItem("usuario");
    setToken(null);
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, jwtUsuario, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext
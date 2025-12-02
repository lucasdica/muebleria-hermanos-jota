import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function RutaProtegida({ children }) {
  const { usuario, jwtUsuario, loading } = useContext(AuthContext);

  // Mientras carga usuario y token desde localStorage
  if (loading) {
    return <p>Cargando...</p>;
  }

  // Si no hay token o no hay usuario
  if (!jwtUsuario || !usuario) {
    return <Navigate to="/login" replace />;
  }

  // Si está autenticado, mostrar la ruta protegida
  return children;
}
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import styles from "../Login/Login.module.css";
import { API_USUARIOS } from "../config";

function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [form, setForm] = useState({
    email: "",
    clave: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_USUARIOS}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.mensaje || data.message || "Error al iniciar sesión");
        return;
      }

      // Guardar sesión en context
      login(data.jwtUsuario, data.usuario);

      navigate("/");
    } catch (error) {
      console.error("Error en login:", error);
      alert("Error en el inicio de sesión. Revisá la consola.");
    }
  };

  return (
    <div className={styles["contenedor-registro"]}>
      <h1>Iniciar sesión</h1>

      <form onSubmit={handleSubmit}>
        <div className={styles["fila-formulario"]}>
          <div className={styles["grupo-formulario"]}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles["grupo-formulario"]}>
            <label>Contraseña</label>
            <input
              type="password"
              name="clave"
              value={form.clave}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <button type="submit">Ingresar</button>
      </form>

      <p style={{ marginTop: "15px" }}>
        ¿No tenés cuenta?{" "}
        <Link to="/registro" style={{ color: "var(--color-prin)" }}>
          Registrate acá
        </Link>
      </p>
    </div>
  );
}

export default Login;
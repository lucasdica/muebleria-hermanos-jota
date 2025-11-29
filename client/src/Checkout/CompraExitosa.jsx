import { useNavigate } from "react-router-dom";
import styles from "./CompraExitosa.module.css";

function CompraExitosa() {
    const navigate = useNavigate();

    return (
        <div className={styles.contenedor}>
            <h2 className={styles.title}>Compra realizada con éxito</h2>
            <h3>Volver al <button className={styles.btnInicio} onClick={() => navigate("/")}>inicio</button></h3>
        </div>
    );
}

export default CompraExitosa;

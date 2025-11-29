import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import styles from "../Checkout/Checkout.module.css";

function CheckoutPage() {
    const { usuario } = useContext(AuthContext);
    const { cart, totalPrecio, clearCart } = useContext(CartContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        nombre: "",
        apellido: "",
        email: "",
    });

    useEffect(() => {
        if (usuario) {
            setFormData({
                nombre: usuario.nombre || "",
                apellido: usuario.apellido || "",
                email: usuario.email || "",
            });
        }
    }, [usuario]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleConfirmar = () => {
        navigate("/compra-exitosa");
        clearCart()
    };

    if (!usuario) {
        return (
            <div className={styles.contenedor}>
                <h2>Debes <button className={styles.btnLogin} onClick={() => navigate("/login")}>iniciar sesión</button> para continuar</h2>
            </div>
        );
    }

    return (
        <div className={styles.contenedorCheckout}>
            <h1 className={styles.titulo}>Finalizar Compra</h1>

            {/* FORMULARIO */}
            <div className={styles.formulario}>
                <div className={styles.filaFormulario}>
                    <div className={styles.grupoFormulario}>
                        <label>Nombre:</label>
                        <input type="text" name="nombre" value={formData.nombre} onChange={handleChange}/>
                    </div>

                    <div className={styles.grupoFormulario}>
                        <label>Apellido:</label>
                        <input type="text" name="apellido" value={formData.apellido} onChange={handleChange}/>
                    </div>
                </div>

                <div className={styles.grupoFormulario}>
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange}/>
                </div>
            </div>


            {/* RESUMEN DEL CARRITO */}
            <h2 className={styles.subtitulo}>Tu compra</h2>
            <div className={styles.resumenCarrito}>
                {cart.map((item) => (
                    <div key={item._id} className={styles.item}>
                        <span>{item.nombre}</span>
                        <span>Cant: {item.cantidad}</span>
                        <span>${item.precio * item.cantidad}</span>
                    </div>
                ))}
            </div>

            <p className={styles.total}>Total a pagar: <strong>${totalPrecio}</strong></p>

            <button className={styles.botonConfirmar} onClick={handleConfirmar}>Confirmar compra</button>
        </div>
    );
}

export default CheckoutPage;
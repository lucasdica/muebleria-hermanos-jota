import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import styles from "../Carrito/CartPage.module.css";

function CarritoPage() {
  const { cart, removeFromCart, clearCart, totalPrecio } = useContext(CartContext);
  const { usuario } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleComprar = () => {
    if (!usuario) {
      return navigate("/login");
    }
    navigate("/checkout");
  };

  return (
    <div className={styles["contenedor-carrito"]}>
      <h1 className={styles["titulo-carrito"]}>Tu carrito</h1>

      {cart.length === 0 && <p>Tu carrito está vacío.</p>}

      <div className={styles["lista-carrito"]}>
        {cart.map((item) => (
          <div key={item.id} className={styles["item-carrito"]}>
            <div className={styles["item-info"]}>
              <span className={styles["item-nombre"]}>{item.nombre}</span>
              <span className={styles["item-precio"]}>Precio: ${item.precio}</span>
              <span className={styles["item-cantidad"]}>Cantidad: {item.cantidad}</span>
            </div>
            <button
              className={styles["item-eliminar"]}
              onClick={() => removeFromCart(item._id)}
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>

      {cart.length > 0 && (
        <>
          <p className={styles["total-carrito"]}>
            Total: <span>${totalPrecio}</span> 
          </p>

          <button
            className={styles["boton-vaciar"]}
            onClick={clearCart}
          >
            Vaciar carrito
          </button>

          <button
            className={styles["boton-vaciar"]}
            style={{ marginTop: "10px" }}
            onClick={handleComprar}
          >
            Finalizar compra
          </button>
        </>
      )}
    </div>
  );
}

export default CarritoPage;
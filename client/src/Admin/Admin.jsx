import CrearProducto from "./CrearProducto";

const Admin = () => {
  const handleSubmit = (producto) => {
    console.log("✅ Producto creado:", producto);
    alert("Producto creado correctamente");
  };

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto", padding: "1rem" }}>
      <h1>Crear nuevo producto</h1>
      <CrearProducto onSubmit={handleSubmit} />
    </div>
  );
};

export default Admin;

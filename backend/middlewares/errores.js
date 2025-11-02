export function errores(err, req, res, next) {
    const statusCode = err.status || 500;
    const mensaje = err.message || "Error interno del servidor";

    console.error({
        statusCode,
        mensaje,
        stack: err.stack
    });

    res.status(statusCode).json({ error: mensaje });
}
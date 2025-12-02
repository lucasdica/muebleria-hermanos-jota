export function errores(err, req, res, next) {
    
    console.error('Error: ', err.message);
    
    const respuestaError = {
        exito: false,
        mensaje: err.message || 'Error interno del server',
    };

    res.status(err.status || 500).json(respuestaError);
}
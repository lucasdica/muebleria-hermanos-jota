export function rutaNoEncontrada(req, res, next) {
    res.status(404).json({
        error: 'Ruta no encontrada',
        ruta: req.originalUrl,
        metodo: req.method,
        timestamp: new Date().toISOString()
    });

    next()
}
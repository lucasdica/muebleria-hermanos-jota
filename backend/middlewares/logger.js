export function logger(req, res, next) {
    const now = new Date();

    const argentinaTime = now.toLocaleString('es-AR', {
        timeZone: 'America/Argentina/Buenos_Aires',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });
    
    console.log(`[${argentinaTime}] ${req.method} ${req.originalUrl}`);
    
    next();
}
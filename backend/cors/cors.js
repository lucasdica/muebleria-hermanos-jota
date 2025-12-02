const origenesPermitidos =
  process.env.ENTORNO === 'produccion' ? (process.env.ORIGENES_PERMITIDOS?.split(',') || []) : [];

export const corsOptions = {
  origin: (origin, callback) => {
    
    // En desarrollo
    if (process.env.ENTORNO == 'desarrollo') {
      callback(null, true);
      return;
    }

    //En produccion
    if (origenesPermitidos.includes(origin) || !origin) {
      return callback(null, true);
    }

    // Si llega acá, no está permitido
    callback(new Error('No permitido por CORS'));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
};

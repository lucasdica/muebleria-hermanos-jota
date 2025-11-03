const origenesPermitidos = 'https://muebleria-hermanos-jota-psi.vercel.app';

export const corsOptions = {
  origin: (origin, callback) => {
    // Si la solicitud viene de un origen permitido O si no hay origen (como en peticiones desde Postman/Hoppscotch), permítela.
    if (origenesPermitidos.includes(origin) || !origin) {
      callback(null, true);
    } else {
      // Bloquea cualquier otro origen no autorizado
      callback(new Error('No permitido por CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Permite los métodos que necesites
  credentials: true // Permite que se envíen cookies y headers de autorización
};

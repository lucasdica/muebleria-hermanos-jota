import mongoose from "mongoose";

export function debugProductos(req, res, next) {
  // Solo loguear requests que tengan productos en el body
  if (req.body && req.body.productos && Array.isArray(req.body.productos)) {
    console.log('=== DEBUG PRODUCTOS ===');
    console.log('Ruta:', req.method, req.url);
    console.log('Productos en body:', req.body.productos);

    // Identificar elementos que no son ObjectIds
    const noObjectIds = req.body.productos.filter(id =>
      !mongoose.Types.ObjectId.isValid(id)
    );

    if (noObjectIds.length > 0) {
      console.log('🚨 ELEMENTOS QUE NO SON OBJECTIDs:', noObjectIds);
      console.log('Posible origen: frontend enviando datos incorrectos');
    }
    console.log('=======================');
  }
  next();
}

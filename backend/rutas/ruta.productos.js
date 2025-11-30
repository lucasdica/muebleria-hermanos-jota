import { Router } from "express";
import * as controladorProductos from '../controller/controlador.producto.js'

const rutaProductos = Router();

// GET /api/productos, muesta todos los productos
rutaProductos.get('/', controladorProductos.listarProductos);

rutaProductos.get('/destacados', controladorProductos.listarProductosDestacados);

// GET /api/productos/:id, muestra un producto por su id
rutaProductos.get('/:id', controladorProductos.verDetallesDelProducto);

// POST /api/productos, crear nuevo producto
rutaProductos.post('/', controladorProductos.crearProducto);

// PUT /api/productos/:id, actualiza un product por su id
rutaProductos.put('/:id', controladorProductos.actualizarProducto);

// DELETE /api/productos/:id, elimina un product por su id
rutaProductos.delete('/:id', controladorProductos.eliminarProducto);

export default rutaProductos;
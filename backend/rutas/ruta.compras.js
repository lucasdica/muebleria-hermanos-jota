import { Router } from "express";
import * as comprasControlador from '../controller/controlador.compra.js'

const rutasCompras = Router();

//crea orden de compra
rutasCompras.post('/', comprasControlador.crearCompra);

//finalizar, confirmar
rutasCompras.post('/:id/confirmar', comprasControlador.confirmarCompra);

//obtener listado de compras de un usuario
rutasCompras.get('/historial', comprasControlador.obtenerHistorialCompras);

//ver detalle de compra especifica
rutasCompras.get('/:id', comprasControlador.obtenerDetalleCompra);

export default rutasCompras;
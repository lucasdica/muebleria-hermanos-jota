import { Router } from "express";
import { Product } from "../modelos/modelo.product.js";
import { Usuario } from '../modelos/modelo.usuario.js';
//modelo de compra

const rutaCompras = Router();

//crea orden de compra
rutaCompras.post('/', async (req, res, next) => {

});

//finalizar, confirmar
rutaCompras.post('/:id/confirmar', async (req, res, next) => {

});

//obtener listado de compras de un usuario
rutaCompras.get('/historial', async (req, res, next) => {

});

//ver detalle de compra especifica
rutaCompras.get('/:id', async (req, res, next) => {

});

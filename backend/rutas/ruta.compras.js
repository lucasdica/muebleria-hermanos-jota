import { Router } from "express";
import { Compra } from "../modelos/modelo.compra.js";
import { Product } from "../modelos/modelo.product.js";
//modelo de compra

const rutasCompras = Router();

//crea orden de compra
rutasCompras.post('/', async (req, res, next) => {
    try {
        const {usuario, productos, precioTotal} = req.body;
        
        console.log(`usuairo: ${usuario}, productos: ${productos}, total: ${precioTotal}`);

        const nuevaCompra = new Compra({
            usuario: usuario,
            productos: productos,
            precioTotal: precioTotal,
            estado: 'pendiente'
        })

        const compraGuardada = await nuevaCompra.save();

        res.status(201).json({exito: true, mensaje: 'Orden de compra creada exitosamente', data: compraGuardada})
    } catch (error) {
        next(error);
    }
});

//finalizar, confirmar
rutasCompras.post('/:id/confirmar', async (req, res, next) => {
try {
    const {id} = req.params;

    const compra = await Compra.findById(id);

    if(!compra) {
        return req.status(404).json({exito: false, mensaje: 'Compra no encontrada'})
    }

    if(compra.estado !== 'pendiente') {
        if(compra.estado === 'confirmando'){
        return res.status(400).json({exito: false, mensaje: 'La compra ya fue confirmada'})
        }

        if(compra.estado === 'cancelado') {
        return res.status(400).json({exito: false, mensaje: 'La compra ya fue cancelada'})

        }
    }

    const bulkOperations = compra.productos.map(productoId => ({
        updateOne: {
            filter: { _id: productoId },
            update: { 
                $inc: { numeroDeVentas: 1 }
            }
        }
    }));

    // Ejecutar todas las actualizaciones en una sola operación
    if (bulkOperations.length > 0) {
        await Product.bulkWrite(bulkOperations);
        //console.log(`✅ Actualizadas ${bulkOperations.length} productos`);
    }

    compra.estado = 'confirmando';

    const compraConfirmada = await compra.save(); //tendria que modificar la compra ya existente;

    res.json({exito: true, data: compraConfirmada, mensaje: 'Compra confirmada exitosamente'});

} catch (error) {
    next(error);
}
});

//obtener listado de compras de un usuario
rutasCompras.get('/historial', async (req, res, next) => {
    try {
        const usuarioId = req.user.id;

        const compras = await Compra.find({ usuario: usuarioId}).populate('productos.product', 'nombre imagen').sort({createdAt: -1});

        res.json({exito: true, historial: compras, cantidadCompras: compras.length});

    } catch (error) {
        next(error);
    }
});

//ver detalle de compra especifica
rutasCompras.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;

        const compra = await Compra.findById(id).populate('usuario', 'nombre email').populate('productos.product', 'nombre descripcion imagen');
        
        if(!compra) {
            return res.status(404).json({exito: false, mensaje: 'Compra no encontrada'});
        }

        res.json({exito: true, compra: compra});

    } catch (error) {
        next(error);
    }
});

export default rutasCompras;
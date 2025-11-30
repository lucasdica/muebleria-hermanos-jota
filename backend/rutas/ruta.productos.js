import { Router } from "express";
import { Product } from "../modelos/modelo.product.js";

const rutaProductos = Router();

// GET /api/productos, muesta todos los productos
rutaProductos.get('/', async (req, res, next) =>{
    try {

        const products = await Product.find({});

        res.status(200).json(products);
    } catch (error) {
        console.error('Error al obtener los products', error.message);
        error.status = 400;
        next(error);
    }
})

rutaProductos.get('/destacados', async (req, res, next) => {
    try {
        
        const productosDestacados = await Product.find().sort({ numeroDeVentas: -1}).limit(4);
        
        if(productosDestacados.length === 0) {
            return res.status(200).json({mensaje: 'No se encotraron productos', destacados: []});
        }

        res.status(200).json({
            mensaje: 'Destacados encontrados con exito',
            destacados: productosDestacados,
            total: productosDestacados.length
        })

    } catch (error) {
        console.error(`Error al intentar obtener los productos destacados`, error.message);
        next(error);
    }
})

// GET /api/productos/:id, muestra un producto por su id
rutaProductos.get('/:id', async (req, res, next) =>{
    try {
        const productId = req.params.id; 
        
        console.log(`El id buscado es: ${productId}`);
        const productBuscado = await Product.findById(productId);

        if(!productBuscado){
            const error = new Error(`No se encontro el producto especificado, Id: ${productId}`);
            error.status = 404;
            return next(error);
        }

        console.log(`El producto encontrado es: ${productBuscado}`);

        res.status(200).json(productBuscado);
    } catch (error) {
        console.error(`Error al buscar el producto`, error.message);
        error.status = 400;
        next(error);
    }
})

// POST /api/productos, crear nuevo producto
rutaProductos.post('/', async (req, res, next) => {
try {
    const datosNuevos = req.body;
    
    const nuevoProduct = new Product(datosNuevos);
    
    const productGuardado = await nuevoProduct.save();
    
    console.log(`Los datos guardados son: ${JSON.stringify(productGuardado, null, 2)}`);

    res.status(201).json({
        mensaje: 'Product creado con exito',
        usuario: productGuardado
    });

} catch (error) {
    
    console.error('Error al crear el Product',error.message);

    error.status = 400;
    next(error);
}
})

// PUT /api/productos/:id, actualiza un product por su id
rutaProductos.put('/:id', async (req, res, next) => {
    try {
        
        const productId = req.params.id;
        const datosActualizados = req.body;
        console.log(`Actualizando product con Id: ${productId}, con los datos: ${datosActualizados}`);

        const productActualizado = await Product.findByIdAndUpdate(
            productId,
            datosActualizados,
            {
                new: true, runValidators: true
            });

        if(!productActualizado) {
            const error = new Error(`No se encontro el product con Id: ${productId}`);
            error.status(404);
            return next(error);
        }

        res.status(200).json({
            mensaje: 'Usuario actualizado con exito',
            usuario: productActualizado
        });

    } catch (error) {
        console.error(`Error al actualizar el producto`, error.message);
        error.status(400);
        next(error);
    }
})

// DELETE /api/productos/:id, elimina un product por su id
rutaProductos.delete('/:id', async (req, res, next) => {
    try {
        const productId = req.params.id;

        console.log(`Se eliminara el product con id: ${productId}`);
        
        const productEliminado = await Product.findByIdAndDelete(productId);
        
        if(!productEliminado) {
            const error = new Error(`No se encontro el product con Id: ${productId}`);
            error.status = 404;
            return next(error);
        }

        res.status(200).json({
            mensaje: `Product con id: ${productId} eliminado con exito`,
            product: productEliminado
        });

    } catch (error) {
        console.error(`Error al intentar eliminar el producto`, error.message);
        error.status = 400;
        next(error);
    }
})


export default rutaProductos;
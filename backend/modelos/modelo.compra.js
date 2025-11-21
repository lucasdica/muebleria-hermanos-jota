import mongoose from 'mongoose'
import { Product } from './modelo.product'
import { Usuario } from './modelo.usuario'

const compraSchema = new mongoose.Schema ({

    productos: {
        type: [Product],
        required: true
    },
    precioTotal: {
        type: Number,
        required: true,
    },
    comprador: {
        type: Usuario,
        required: true
    }, 
}, {
    timestamps: true,
    collection: 'Compras',
    strict: true
});

export const Compra = mongoose.model('Compra', compraSchema);

import mongoose from 'mongoose'

const compraSchema = new mongoose.Schema ({
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    productos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    }],
    precioTotal: {
        type: Number,
        required: true,
    },
    estado: {
        type: String,
        enum: ['pendiente', 'confirmando', 'cancelado'],
        default: 'pendiente'
    },
}, {
    timestamps: true,
    collection: 'Compras',
    strict: true
});

export const Compra = mongoose.model('Compra', compraSchema);

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    ID: {
        type: Number,
        required: true,
        unique: true
    },
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    precio: {
        type: Number,
        required: true,
        min: 0
    },
    // enStock: {
    //     type: Boolean,
    //     default: productSchema.stock > 0
    // },
    stock: {
        type: Number,
        default: 0
    },
    coloresDisponibles: [{
        type: String,
        trim: true
    }],
    medidas: {
        type: String,
        trim: true
    },
    materiales: [{
        type: String,
        trim: true
    }],
    acabado: [{
        type: String,
        trim: true
    }],
    regulacion: {
        type: String,
        trim: true
    },
    certificacion: {
        type: String,
        trim: true
    },
    descripcion: {
        type: String,
        required: true
    },
    imagen: {
        type: String,
        validate: {
            validator: function(v) {
                return /^https?:\/\/.+\..+/.test(v);
            },
            message: 'La imagen debe ser una URL válida'
        }
    }
}, {
    timestamps: true,
    collection: 'Products'
});

module.exports = mongoose.model('Product', productSchema);
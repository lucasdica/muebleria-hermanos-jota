import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
    // id: {
    //     type: Number,
    //     // required: true,
    //     unique: true
        
    // },
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
    enStock: {
        type: Number,
        default: 0
    },
    // stock: {
    //     type: Number,
    //     default: 0
    // },
    coloresDisponibles: {
        type: String,
        trim: true
    },
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
    peso: {
        type: Number,
        //default: 0
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
    },
    numeroDeVentas: {
        type: Number,
        default: 0,
        required: true
    }
}, {
    timestamps: true,
    collection: 'Products',
    strict: false //puedo agregarle cosas que no estan en el schema, se agregan a lo ultimo
});

export const Product = mongoose.model('Product', productSchema);
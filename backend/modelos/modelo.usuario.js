import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    nombre: {type: String, required: true},
    apellido: {type: String, required: true},
    email: {type: String, required: true},
    fechaNacimiento: {type: Date, required: true},
    fotoPerfil: {type: String, default: 'https://lucasdica.github.io/productos-hermanos-jota/productos-images/profileDefault.png'},
    clave: {type: String, required: true},
    misPedidos: {type: [String], default: ['vacio']}
},{
    timestamps: true,
    collection: 'Usuarios'
})

export const Usuario = mongoose.model('Usuario', userSchema);
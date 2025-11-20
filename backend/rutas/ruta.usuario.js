import {Router} from 'express'
import {Usuario} from '../modelos/modelo.usuario.js'
import bcrypt from 'bcrypt'

const rutasUsuario = Router();

rutasUsuario.post('/registro', async (req, res, next) =>{
    try {
        
        const { nombre, apellido, email, fechaNacimiento, clave, fotoPerfil } = req.body;

        const existeUsuario = await Usuario.findOne({ $or: [{email}]});

        if(existeUsuario) {
            return res.status(400).json({mensaje: 'El correo ya esta registrado'});
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(clave, salt);

        //paso 4
        const nuevoUsuario = new Usuario({
            nombre: nombre.trim(),
            apellido: apellido.trim(),
            email: email.toLowerCase().trim(),
            clave: hash,
            fechaNacimiento: new Date(fechaNacimiento), //fechaNacimiento: Date.parse(fechaNacimiento) Number
            fotoPerfil: fotoPerfil || null,
            misPedidos: []
        });

        const usuarioGuardado = await nuevoUsuario.save();

        console.log(`Usuario creado con exito, _id: ${usuarioGuardado._id} `);

        const usuarioRespuesta = usuarioGuardado.toObject();
        delete usuarioRespuesta.clave;

        return res.status(201).json({mensaje: 'Usuario creado con exito', usuario: usuarioRespuesta});

    } catch (error) {
        res.status(500).json({mensaje: 'Error interno del servidor'});
    }
})


export default rutasUsuario;
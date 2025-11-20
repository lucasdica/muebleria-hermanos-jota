import {Router} from 'express'
import {Usuario} from '../modelos/modelo.usuario.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const rutasUsuario = Router();

rutasUsuario.post('/registro', async (req, res) =>{
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

rutasUsuario.post('/login', async (req, res) => {
try {
    
    const usuario = await Usuario.findOne({email: req.body.email});

    if(!usuario) {
        return res.status(400).json({mensaje: 'Credenciales invalidas'});
    }

    const claveValida = await bcrypt.compare(req.body.clave, usuario.clave);

    if(!claveValida){
        return res.status(400).json({mensaje: 'Credenciales invalidas'});
    }

    const jwtUsuario = jwt.sign(
        {id: usuario._id, email: usuario.email},
        process.env.SECRETO_JWT,
        {expiresIn: '1h'}
    );

    res.status(200).json({
        jwtUsuario,
        usuario: {
            id: usuario._id,
            email: usuario.email
        }
    });

} catch (error) {
    res.status(500).json({mensaje: 'Error interno del servidor'})
}
})


export default rutasUsuario;
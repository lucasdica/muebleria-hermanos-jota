import { Usuario } from "../modelos/modelo.usuario.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function crearUsuario(req, res, next) {

  try {
    const { nombre, apellido, email, fechaNacimiento, clave, fotoPerfil } =
      req.body;

    const existeUsuario = await Usuario.findOne({ $or: [{ email }] });

    if (existeUsuario) {
      return res.status(400).json({ mensaje: "El correo ya esta registrado" });
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
      misPedidos: [],
    });

    const usuarioGuardado = await nuevoUsuario.save();

    console.log(`Usuario creado con exito, _id: ${usuarioGuardado._id} `);

    const usuarioRespuesta = usuarioGuardado.toObject();
    delete usuarioRespuesta.clave;

    return res
      .status(201)
      .json({ mensaje: "Usuario creado con exito", usuario: usuarioRespuesta });
  } catch (error) {
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
}

export async function iniciarSesion(req, res, next) {

  try {
    const usuario = await Usuario.findOne({ email: req.body.email });

    if (!usuario) {
      return res.status(400).json({ mensaje: "Credenciales invalidas" });
    }

    const claveValida = await bcrypt.compare(req.body.clave, usuario.clave);

    if (!claveValida) {
      return res.status(400).json({ mensaje: "Credenciales invalidas" });
    }

    const jwtUsuario = jwt.sign(
      { id: usuario._id, email: usuario.email },
      process.env.SECRETO_JWT,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      jwtUsuario,
      usuario: {
        id: usuario._id,
        email: usuario.email,
      },
    });
  } catch (error) {
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
}

export async function obtenerPerfilUsuario(req, res, next) {

  try {
    const usuarioId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(usuarioId)) {
      // const error = new Error('ID del ususario invalido');
      // error.status = 400;
      // return next(error);
      return res.status(400).json({mensaje: "ID de usuario inválido"});
    }

    const usuarioInfo = await Usuario.findById(usuarioId);

    if (!usuarioInfo) {
      // const error = new Error('Error al intentar obtener la informacion del usuario');
      // error.status = 404;
      // return next(error);
      return res.status(404).json({mensaje: "Error al intentar obtener la informacion de perfil",});
    }

    res.status(200).json(usuarioInfo);

  } catch (error) {
    error.status = 500;
    next(error);
  }
}

export async function eliminarUsuario(req, res, next) {
  try {
    
    const correoUsuario = req.body.correoUsuario;

    const usuarioEliminado = await Usuario.findOneAndDelete({ email: correoUsuario});

    // if(!usuarioEliminado){
    //   return res.status(404).json({exito: false, correoUsuario: correoUsuario, mensaej: `Usuario de correo: "${correoUsuario}" no encotrado`})
    // }

    if(!usuarioEliminado) {
      const error = new Error(`Usuario de correo: "${correoUsuario}" no encontrado`);
      error.status = 404;
      error.exito = false;
      return next(error);
    }

    res.json({ exito: true, mensaje: 'Usuario eliminado exitosamente', data: usuarioEliminado });

  } catch (error) {
    error.mensaje = error.message;
    error.status = 500;
    error.exito = false;
    next(error);
  }
}

export async function actualizarUsuario(req, res, next) {
  try {
    
    const correoUsuario = req.body.correoUsuario;

  } catch (error) {
    next(error);
  }
}
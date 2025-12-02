import { Router } from "express";
import * as controladorUsuarios from '../controller/controlador.usuario.js'
import { autenticarUsuario } from "../middlewares/autenticacion.js";

const rutasUsuario = Router();

rutasUsuario.post("/registro", controladorUsuarios.crearUsuario);

rutasUsuario.post("/login", controladorUsuarios.iniciarSesion);

rutasUsuario.get("/perfil/:id", autenticarUsuario, controladorUsuarios.obtenerPerfilUsuario);

rutasUsuario.delete('/eliminarUsuario', autenticarUsuario, controladorUsuarios.eliminarUsuario);

rutasUsuario.put('/actualizarUsuario', autenticarUsuario, controladorUsuarios.actualizarUsuario);

export default rutasUsuario;

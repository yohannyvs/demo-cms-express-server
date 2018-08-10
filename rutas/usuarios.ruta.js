"use strict"

var express = require("express");

var ControladorUsuarios = require( "../controladores/usuarios.controlador.js" );

var api = express.Router();

var md_aut = require( "../token/aut.js" );

// Ruta del Metodo Get
api.get( "/probando-controlador-usuarios", md_aut.autenticacion, ControladorUsuarios.pruebaUsuario );

//Metodo Post
api.post( "/crear-usuarios", ControladorUsuarios.crearUsuarios );
api.post( "/login", ControladorUsuarios.ingresoUsuario );

//Metodos Put
api.put( "/actualiza-usuario/:id", md_aut.autenticacion, ControladorUsuarios.actualizarUsuario );

//Metodo Delete
api.delete( "/borrar-usuario/:id", md_aut.autenticacion, ControladorUsuarios.borrarUsuario );

module.exports = api;
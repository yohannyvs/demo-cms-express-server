"use strict"

var express = require("express");

var md_aut = require( "../token/aut.js" );

var ControladorGalerias = require( "../controladores/galerias.controlador.js" );

//Dependencia para cargar ficheros/archivos
var multipart = require("connect-multiparty");

var fichero = multipart({
	//Ruta donde se suben la imagenes
	uploadDir: "./ficheros/galeria"
});

var api = express.Router();

// Metodo Get
api.get( "/probando-controlador-galerias", ControladorGalerias.pruebGalerias );
api.get( "/mostrar-fotos", ControladorGalerias.mostrarFotos );
api.get( "/tomar-imagen-galeria/:imagen", ControladorGalerias.tomarImagenGaleria );

//Metodos Post
//ruta para subir una img, con token y ruta para las imagenes
api.post( "/crear-foto", [md_aut.autenticacion, fichero], ControladorGalerias.crearFoto );

//Metodo Delete
api.delete( "/borrar-foto/:id", md_aut.autenticacion, ControladorGalerias.borrarFoto );

module.exports = api;
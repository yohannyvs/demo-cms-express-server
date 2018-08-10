"use strict"

var express = require("express");

var md_aut = require( "../token/aut.js" );

var ControladorSlides = require( "../controladores/slides.controlador.js" );

var api = express.Router();

//Dependencia para cargar ficheros/archivos
var multipart = require("connect-multiparty");

var fichero = multipart({
	//Ruta donde se suben la imagenes
	uploadDir: "./ficheros/slide"
});

// Metodo Get
api.get( "/probando-controlador-slides", ControladorSlides.pruebaSlides );

api.get( "/mostrar-slides", ControladorSlides.mostrarSlides );

api.get( "/tomar-imagen-slide/:imagen", ControladorSlides.tomarImagenSlide );

//Metodos Post
//ruta para subir un slide, con token y ruta para las imagenes
api.post( "/crear-slide", [md_aut.autenticacion, fichero], ControladorSlides.crearSlide );

//metodos Put
api.put( "/actualizar-slide/:id", [md_aut.autenticacion, fichero], ControladorSlides.actualizarSlide );

//Metodo Delete
api.delete( "/borrar-slide/:id", md_aut.autenticacion, ControladorSlides.borrarSlide );

module.exports = api;
"use strict"

var express = require("express");
var bodyParser = require("body-parser");

var app = express();

app.use( bodyParser.urlencoded( { extended:false } ) );
app.use(bodyParser.json());

/*=============================================
Cargar Rutas
=============================================*/

var rutaUsuarios = require("./rutas/usuarios.ruta.js");
var rutaSlides = require("./rutas/slides.ruta.js");
var rutaGalerias = require("./rutas/galerias.ruta.js");

/*=============================================
Cabezeras HTTP
=============================================*/

app.use((req, res, next)=>{

	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method");
	res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
	res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
	next();
 
});

/*=============================================
Rutas Base
=============================================*/

app.use( "/api", rutaUsuarios );
app.use( "/api", rutaSlides );
app.use( "/api", rutaGalerias );

//Exportamos la app
module.exports = app;
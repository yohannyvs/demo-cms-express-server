"use strict"

/*=============================================
Libreria MongoDB
=============================================*/

var mongoose = require("mongoose");

/*=============================================
Modulo de Express
=============================================*/

var app = require("./app");
var port = process.env.PORT || 1234;

/*=============================================
Conexion a MongoDB
=============================================*/

mongoose.connect("mongodb://localhost:27017/mongodb", ( error, respuestas ) => {

	if(error)
	{
		throw error;
	}else{
		console.log( "Conexión exitosa!!" );

		app.listen( port, function()
		{
			console.log( "Servidor API REST en http://localhost:" + port );
		});
	}

});


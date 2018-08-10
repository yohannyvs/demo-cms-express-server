"use strict"

//Requerimimos dependencias
var token = require("jwt-simple");
var momento = require("moment"); 

var claveSecreta = "clave_secreta";

/*=============================================
MEtodo de Autenticacion
=============================================*/

//Crear un Middleaware
exports.autenticacion = function( req, res, next )
{
	if( !req.headers.authorization )
	{
		return res.status(403).send({ mensaje: "La petición no tiene cabezera de autenticación" });
	}else {
		var tokenEnviado = req.headers.authorization.replace( /['"]+/g , '' );

		//Excepciones
		try
		{
			var cargarToken = token.decode( tokenEnviado, claveSecreta );

			//Compara fecha de expiracion del token
			if( cargarToken.exp <= momento().unix() )
			{
				return res.status(403).send({ mensaje: "El token ha expirado" });
			}

		}catch(excepcion){
			return res.status(403).send({ mensaje: "El token no es valido" });
		}

		req.usuarioToken = cargarToken;

		next();
	}
}

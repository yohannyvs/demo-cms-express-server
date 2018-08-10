"use strinct"

//Requerimimos dependencias
var token = require("jwt-simple"); //crea el token
var momento = require("moment"); //crea registro de creacion del token y de expiración

//Con esta clave secreta se decodifica el token
var claveSecreta = "clave_secreta";

/*=============================================
=  Metodo del Token
=============================================*/

exports.crearToken = function( usuario )
{
	//Datos a codificar
	var cargarToken = {
		//se usa para guardar el id del objeto
		sub: usuario._id,
		nombre: usuario.usuario,
		now: momento().unix(),
		exp: momento().add( 30,"days" ).unix()
	}

	//Devolver el token codificado
	return token.encode( cargarToken, claveSecreta );
}


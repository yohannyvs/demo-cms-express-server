"use strict"

//importamos dependencia para encriptar contraseña
var bcrypt = require("bcrypt-nodejs");

//importamos el modelo de usuarios
var Usuarios = require( "../modelos/usuarios.modelos.js" );

//importamos el token
var token = require("../token/token.js");

//Metodo de Prueba.
function pruebaUsuario( req, res )
{
	res.status(200).send( {mensaje: "Probando Controlador Usuarios"} );
}

//Metodo para crear usuarios
function crearUsuarios( req, res )
{
	//Creamos instancia del modelo del usuario
	var usuarios = new Usuarios();

	//Obtenenos los parametros de la peticion Post
	var parametros = req.body;
	
	usuarios.usuario = parametros.usuario;
	
	if( parametros.password )
	{
		bcrypt.hash( parametros.password, null, null, function( error, hash ){
			usuarios.password = hash;

			if( parametros.usuario != null )
			{
				usuarios.save( (error, usuarioGuardado) => {
					if(error)
					{
						res.status(500).send( { mensaje: "Error al guardar el usuario" });
					}else {
						res.status(200).send( { usuarioGuardado } );
					}
				});
			}
		});
	}
}

//Metodo para login
function ingresoUsuario( req, res )
{

	var parametros = req.body;
	var usuario = parametros.usuario;
	var password = parametros.password;

	Usuarios.findOne( {usuario:usuario}, ( error, seleccionUsuario )=>{

		if(error)
		{
			res.status(500).send( { mensaje: "Error al ingresar el usuario" });
		}
		else{
			if( !seleccionUsuario )
			{
				res.status(404).send( { mensaje: "El usuario no existe." });
			}else {
				
				bcrypt.compare( password, seleccionUsuario.password, function( error, ok ){
					if( ok )
					{
						//Debemos enviar el parametro del Token en verdadero
						if( parametros.token )
						{
							//Devolvemos un token de JWT
							res.status(200).send( { token: token.crearToken( seleccionUsuario ), usuario: seleccionUsuario.usuario } );
						}

					}else{
						res.status(404).send( { mensaje: "El usuario no ha podido ingresar." });
					}
				});
			}
		}

	});
}

//Metodo para Actualizar
function actualizarUsuario( req, res )
{
	var id = req.params.id;
	var actualizar = req.body;

	if( id != req.usuarioToken.sub )
	{
		return res.status(200).send({ mensaje: "No tienes permisos para actualizar este usuario" });
	}

	Usuarios.findByIdAndUpdate( id, actualizar, ( error, usuarioActualizado ) => {

		if( error )
		{
			res.status(500).send({ mensaje: "Error al actualizar el usuario" });
		}else {
			if( !usuarioActualizado )
			{
				res.status(404).send({ mensaje: "No se ha podido actualizar el usuario" });
			}else {
				res.status(200).send({ usuarioActualizado });
			}
		}

	} );
}

//Metodo para borrar
function borrarUsuario( req, res )
{
	var id = req.params.id;

	if( id != req.usuarioToken.sub )
	{
		return res.status(200).send({ mensaje: "No tienes permisos para actualizar este usuario" });
	}

	Usuarios.findByIdAndRemove( id, ( error, usuarioBorrado ) => {

		if( error )
		{
			res.status(500).send({ mensaje: "Error al borrar el usuario" });
		}else {
			if( !usuarioBorrado )
			{
				res.status(404).send({ mensaje: "No se ha podido borrar el usuario" });
			}else {
				res.status(200).send({ usuarioBorrado });
			}
		}

	} );

}

//Exportamos los metodos del modulo
module.exports = { 
	pruebaUsuario,
	crearUsuarios,
	ingresoUsuario,
	actualizarUsuario,
	borrarUsuario
}
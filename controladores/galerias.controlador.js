"use strict"

//Importar Modelo Slide
var Galeria = require( "../modelos/galerias.modelos.js" );

//Dependencia para manipular archivos
var fs = require( "fs" );
var path = require( "path" );

//Metodo de Prueba.
function pruebGalerias( req, res )
{
	res.status(200).send( {mensaje: "Probando Controlador Galerias"} );
}

//Crear Foto
function crearFoto( req, res )
{
	var galerias = new Galeria();

	var parametros = req.body;

	galerias.foto = parametros.foto;

	if( req.files )
	{
		var imagenRuta = req.files.foto.path;
		var imagenSplit = imagenRuta.split('/');
		galerias.foto = imagenSplit[2];

		galerias.save(( error, fotoGuardada) => {
			if(error)
			{
				res.status(500).send( { mensaje: "Error al guardar la foto" });
			}else {
				if( !fotoGuardada )
				{
					res.status(404).send( { mensaje: "No se ha podido guardar la foto" } );
				}else {
					res.status(200).send( { fotoGuardada } );
				}
			}
		});
	}
}

//Mostrar Foto
function mostrarFotos( req, res )
{
	Galeria.find( (error, mostrandoGaleria) => {

		if(error)
		{
			res.status(500).send({ mensaje: "Error en la petición" });
		}else{
			res.status(200).send({ mostrandoGaleria });
		}

	} ).sort("_id");
}

//Eliminar Foto
function borrarFoto( req, res )
{
	var id = req.params.id;

	Galeria.findOne({ _id: id }, ( error, capturarFoto ) => {
		if(error)
		{
			res.status(500).send({ mensaje: "Error al capturar el Foto" });
		}else{
			if(!capturarFoto)
			{
				res.status(404).send({ mensaje: "No se ha podido capturar el Foto" });
			}else {
				var antiguaImagen = capturarFoto.foto;
				var rutaImagen = "./ficheros/galeria/" + antiguaImagen;

				fs.unlink(rutaImagen);
			}
		}
	});

	setTimeout(function(){
		Galeria.findByIdAndRemove( id , ( error, borrarFoto ) => {
			if(error)
			{
				res.status(500).send({ mensaje: "Error al borrar la Foto" });
			}else{
				if(!borrarFoto)
				{
					res.status(404).send({ mensaje: "No se ha podido borrar la Foto" });
				}else {

					res.status(200).send({ borrarFoto });
				}
			}
		});
	},1000);
}

function tomarImagenGaleria( req, res )
{
	var imagen = req.params.imagen;
	var rutaImagen = "./ficheros/galeria/" + imagen;

	fs.exists( rutaImagen, function( exist ){
		if(exist)
		{
			res.sendFile(path.resolve( rutaImagen ));
		}else {
			res.status(404).send({ mensaje: "La imagen no existe "});
		}
	} );
}

module.exports = { 
	pruebGalerias,
	crearFoto,
	mostrarFotos,
	borrarFoto,
	tomarImagenGaleria
}
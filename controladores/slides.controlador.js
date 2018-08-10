"use strict"

//Importar Modelo Slide
var Slides = require( "../modelos/slides.modelos.js" );

//Dependencia para manipular archivos
var fs = require( "fs" );

var path = require( "path" );

//Metodo de Prueba.
function pruebaSlides( req, res )
{
	res.status(200).send( {mensaje: "Probando Controlador Slides"} );
}

//Crear Slide
function crearSlide( req, res )
{
	var slides = new Slides();

	var parametros = req.body;

	slides.titulo = parametros.titulo;
	slides.descripcion = parametros.descripcion;

	if( req.files )
	{
		var imagenRuta = req.files.imagen.path;
		var imagenSplit = imagenRuta.split('/');
		slides.imagen = imagenSplit[2];

		if( slides.titulo != null && slides.descripcion != null )
		{
			slides.save(( error, slideGuardado) => {
				if(error)
					{
						res.status(500).send( { mensaje: "Error al guardar el slide" });
					}else {
						if( !slideGuardado )
						{
							res.status(404).send( { mensaje: "No se ha podido guardar el slide" } );
						}else {
							res.status(200).send( { slideGuardado } );
						}
					}
			});
		}
	}
}


function mostrarSlides( req, res )
{
	Slides.find( (error, mostrandoSlides) => {

		if(error)
		{
			res.status(500).send({ mensaje: "Error en la petición" });
		}else{
			res.status(200).send({ mostrandoSlides });
		}

	} ).sort("_id");
}

function actualizarSlide( req, res )
{
	var slides = new Slides();

	var id = req.params.id;
	var parametros = req.body;

	slides.titulo = parametros.titulo;
	slides.descripcion = parametros.descripcion;

	var cambioImagen = false

	if(parametros.actualizarImagen == "0")
	{
		slides.imagen = parametros.rutaImagenActual;
		cambioImagen = true;
	}else{
		if(req.files)
		{
			var imagenRuta = req.files.imagen.path;
			var imagenSplit = imagenRuta.split('/');
			slides.imagen = imagenSplit[2];

			var antiguaImagen = parametros.rutaImagenActual;
			var rutaImagen = "./ficheros/slide/" + antiguaImagen;

			fs.unlink(rutaImagen);
		}

		cambioImagen = true;
	}

	if(cambioImagen)
	{
		if(slides.titulo != null && slides.descripcion != null && slides.imagen != null)
		{
			var actualizar = {
				"titulo": slides.titulo,
				"descripcion": slides.descripcion,
				"imagen": slides.imagen
			}

			Slides.findByIdAndUpdate( id, actualizar, ( error, slideActualizado ) => {
				if(error)
				{
					res.status(500).send({ mensaje: "Error al actualizar el Slide" });
				}else{
					if(!slideActualizado)
					{
						res.status(404).send({ mensaje: "No se ha podido actualizar el Slide" });
					}else {
						res.status(200).send({ slideActualizado });
					}
				}
			});
		}
	}
}

function borrarSlide( req, res )
{
	var id = req.params.id;

	Slides.findOne({ _id: id }, ( error, capturarSlide ) => {
		if(error)
		{
			res.status(500).send({ mensaje: "Error al capturar el Slide" });
		}else{
			if(!capturarSlide)
			{
				res.status(404).send({ mensaje: "No se ha podido capturar el Slide" });
			}else {
				var antiguaImagen = capturarSlide.imagen;
				var rutaImagen = "./ficheros/slide/" + antiguaImagen;

				fs.unlink(rutaImagen);
			}
		}
	});

	setTimeout(function(){
		Slides.findByIdAndRemove( id , ( error, borrarSlide ) => {
			if(error)
			{
				res.status(500).send({ mensaje: "Error al borrar el Slide" });
			}else{
				if(!borrarSlide)
				{
					res.status(404).send({ mensaje: "No se ha podido borrar el Slide" });
				}else {

					res.status(200).send({ borrarSlide });
				}
			}
		});
	},1000);
}

function tomarImagenSlide( req, res )
{
	var imagen = req.params.imagen;
	var rutaImagen = "./ficheros/slide/" + imagen;

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
	pruebaSlides,
	crearSlide,
	mostrarSlides,
	actualizarSlide,
	borrarSlide,
	tomarImagenSlide
}
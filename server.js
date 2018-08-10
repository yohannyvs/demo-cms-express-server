var app = require('./app'); // this is your express app
var http = require('http'); // 3. HTTP server

/**
* Get port from environment and store in Express.
*/
var port = process.env.PORT; // 2. Using process.env.PORT
app.set('port', port);

/**
* Create HTTP server.
*/
var server = http.createServer(app);

/*=============================================
Libreria MongoDB
=============================================*/
var mongoose = require("mongoose");

/*=============================================
Conexion a MongoDB
=============================================*/



mongoose.connect("mongodb://mugen:muneakira00@ds151558.mlab.com:51558/mongodb_01", ( error, respuestas ) => {

  if(error)
  {
    throw error;
  }else{
    console.log( "Conexión exitosa!!" );

    server.listen( port, function()
    {
      console.log( "Servidor API REST funcionando!!!" );
    });
  }

});
var mongoose = require( 'mongoose' );

//Función para desconectar la base de datos
var gracefulShutdown = function (msg, callback) {
    mongoose.connection.close(function () {
        console.log('Mongoose disconnected through ' + msg);
        callback();
    });
};

var dbURI = 'mongodb://localhost/Localizador';
//URL para la base en el servidor
dbURI = 'mongodb://u0haubzbiwyypyf1u8mj:4oEskTsSYoIIVJ2kyvKb@bvoayqrxz5wsvwp-mongodb.services.clever-cloud.com:27017/bvoayqrxz5wsvwp';
//
mongoose.connect(dbURI,{ useNewUrlParser: true });

//Simulacion de evento SIGINT
var readLine = require ("readline");
if (process.platform === "win32"){
    var rl = readLine.createInterface ({
        input: process.stdin,
        output: process.stdout
    });
    rl.on ("SIGINT", function (){
        process.emit ("SIGINT");
    });
}

process.once('SIGUSR2', function () {
    gracefulShutdown('nodemon restart', function () {
        process.kill(process.pid, 'SIGUSR2');
    });
});

//Terminar la conexión con el evento SIGINT
process.on('SIGINT', function () {
    gracefulShutdown('app termination', function () {
        process.exit(0);
    });
});

//Desconectar la bb dd con el evento de Heroku
process.on('SIGTERM', function() {
    gracefulShutdown('Heroku app shutdown', function () {
        process.exit(0);
    });
});

mongoose.connection.on('connected', function () {
    console.log('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error',function (err) {
    console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose disconnected');
});

require('./locations');
var mongoose = require('mongoose');
var Loc = mongoose.model('Location');

var sendJsonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.locationsList = function (req, res) {
    Loc
        .find()
        .exec(function (err, results, stats) {
            var locations = [];
            results.forEach(function(doc) {
                locations.push({
                    distance: doc.distance,
                    name: doc.name,
                    address: doc.address,
                    rating: doc.rating,
                    facilities: doc.facilities,
                    _id: doc._id
                });
            });
            sendJsonResponse(res, 200, locations);
        });
};
module.exports.locationsCreate = function (req, res) {
    sendJsonResponse(res, 200, {"status" : "post success"});
};
module.exports.locationsReadOne = function (req, res) {
    //Controlamos que el id de la localizacion esté en el parámetro
    if (req.params && req.params.locationid) {
        //Utilizamos el modelo de la base de datos
        Loc
            .findById(req.params.locationid)
            .exec(function(err, location) {
                //Si el id específico no existe en la BD
                if (!location) {
                    sendJsonResponse(res, 404, {
                        "message": "Id de la localizacion no encontrado"
                    });
                    return;
                //Si la BD devuelve un error
                } else if (err) {
                    sendJsonResponse(res, 404, err);
                    return;
                }
                //Se devuelve el documento encontrado
                sendJsonResponse(res, 200, location);
            });
    } else {
        sendJsonResponse(res, 404, {
            "message": "No hay id de la localización en el requerimiento"
        });
    }
};
module.exports.locationsUpdateOne = function (req, res) {
    sendJsonResponse(res, 200, {"status" : "put success"});
};
module.exports.locationsDeleteOne = function (req, res) {
    sendJsonResponse(res, 200, {"status" : "delete success"});
};
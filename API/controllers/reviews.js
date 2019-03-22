var mongoose = require('mongoose');
var Loc = mongoose.model('Location');

var sendJsonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.reviewsCreate = function (req, res) {
    sendJsonResponse(res, 200, {"status" : "post success"});
};
//Devolver un comentario sobre una locación específica
module.exports.reviewsReadOne = function (req, res) {
    //Vemos si las variables están en el requerimiento
    if (req.params && req.params.locationid && req.params.reviewid) {
        Loc
            .findById(req.params.locationid)
            //.select('name reviews')
            .exec(function(err, location) {
                var response, review;
                if (!location) {
                    sendJsonResponse(res, 404, {
                        "message": "Id de la localizacion no encontrado"
                    });
                    return;
                //Si la base de datos devuelve un error.
                } else if (err) {
                    sendJsonResponse(res, 404, err);
                    return;
                }
                if (location.reviews && location.reviews.length > 0) {
                    //Se obtiene el comentario con el id enviado por parametro
                    review = location.reviews.id(req.params.reviewid);
                    if (!review) {
                        //Si no se encuentra un comentario con ese id
                        sendJsonResponse(res, 404, {
                            "message": "Comentario no encontrado"
                        });
                    //Se encuentra el comentario exitosamente
                    } else {
                        //se devuelven solo los datos que nos interesan del documento
                        response = {
                            location : {
                                name : location.name,
                                id : req.params.locationid
                            },
                            review : review
                        };
                        sendJsonResponse(res, 200, response);
                    }
                //Si no se encuentran comentarios    
                } else {
                    sendJsonResponse(res, 404, {
                        "message": "No se encontraron comentarios"
                    });
                }
            });
    } else {
        //Si no hay id de la localizacion en el requerimiento
        sendJsonResponse(res, 404, {
            "message": "No hay id de la localización en el requerimiento"
        });
    }
};
module.exports.reviewsUpdateOne = function (req, res) {
    sendJsonResponse(res, 200, {"status" : "put success"});
};
module.exports.reviewsDeleteOne = function (req, res) {
    sendJsonResponse(res, 200, {"status" : "delete success"});
};
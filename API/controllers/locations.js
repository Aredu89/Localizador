const mongoose = require('mongoose')
const Loc = mongoose.model('Location')

const sendJsonResponse = (res, status, content) => {
    res.status(status)
    res.json(content)
}

//Obtener la lista de todas las localizaciones
module.exports.locationsList = (req, res) => {
    Loc
        .find()
        .exec((err, results, stats) => {
            if (!results) {
                sendJsonResponse(res, 404, {
                    "message": "No se encontraron localizaciones"
                })
            } else if (err) {
                sendJsonResponse(res, 404, err)
            } else {
                var locations = []
                results.forEach((doc) => {
                    locations.push({
                        distance: doc.distance,
                        name: doc.name,
                        address: doc.address,
                        rating: doc.rating,
                        facilities: doc.facilities,
                        _id: doc._id
                    });
                });
                sendJsonResponse(res, 200, locations)
            }
        })
}

//Crear una localización
module.exports.locationsCreate = (req, res) => {
    Loc.create({
        name: req.body.name,
        address: req.body.address,
        facilities: req.body.facilities.split(","),
        coords: [parseFloat(req.body.lng), parseFloat(req.body.lat)],
        openingTimes: [{
            days: req.body.days1,
            opening: req.body.opening1,
            closing: req.body.closing1,
            closed: req.body.closed1
        }, {
            days: req.body.days2,
            opening: req.body.opening2,
            closing: req.body.closing2,
            closed: req.body.closed2
        }]
    }, (err, location) => {
        if (err) {
            sendJsonResponse(res, 400, err)
        } else {
            sendJsonResponse(res, 201, location)
        }
    })
}

//Obtener una localización por ID
module.exports.locationsReadOne = (req, res) => {
    //Controlamos que el id de la localizacion esté en el parámetro
    if (req.params && req.params.locationid) {
        //Utilizamos el modelo de la base de datos
        Loc
            .findById(req.params.locationid)
            .exec((err, location) => {
                //Si el id específico no existe en la BD
                if (!location) {
                    sendJsonResponse(res, 404, {
                        "message": "Id de la localizacion no encontrado"
                    })
                //Si la BD devuelve un error
                } else if (err) {
                    sendJsonResponse(res, 404, err)
                } else {
                    //Se devuelve el documento encontrado
                    sendJsonResponse(res, 200, location)
                }
            })
    } else {
        sendJsonResponse(res, 404, {
            "message": "No hay id de la localización en el requerimiento"
        })
    }
}

//Modificar una localización
module.exports.locationsUpdateOne = (req, res) => {
    if (!req.params.locationid) {
        sendJsonResponse(res, 404, {
            "message": "Not found, se requiere el id de la localización"
        })
        return
    }
    Loc
        .findById(req.params.locationid)
        .select('-reviews -rating')
        .exec(
            (err, location) => {
                if (!location) {
                    sendJsonResponse(res, 404, {
                        "message": "No se encontró el id de la localización"
                    })
                    return
                } else if (err) {
                    sendJsonResponse(res, 400, err)
                    return
                }
                location.name = req.body.name
                location.address = req.body.address
                location.facilities = req.body.facilities.split(",")
                location.coords = [
                    parseFloat(req.body.lng),
                    parseFloat(req.body.lat)
                ]
                location.openingTimes = [{
                    days: req.body.days1,
                    opening: req.body.opening1,
                    closing: req.body.closing1,
                    closed: req.body.closed1,
                }, {
                    days: req.body.days2,
                    opening: req.body.opening2,
                    closing: req.body.closing2,
                    closed: req.body.closed2,
                }]
                location.save((err, location) => {
                    if (err) {
                        sendJsonResponse(res, 404, err)
                    } else {
                        sendJsonResponse(res, 200, location)
                    }
                })
            }
        )
}

//Eliminar una localización
module.exports.locationsDeleteOne = (req, res) => {
    var locationid = req.params.locationid
    if (locationid) {
        Loc
            .findByIdAndRemove(locationid)
            .exec(
                (err, location) => {
                    if (err) {
                        sendJsonResponse(res, 404, err)
                        return
                    }
                    sendJsonResponse(res, 204, null)
                }
            )
    } else {
        sendJsonResponse(res, 404, {
            "message": "No se encontró el id de la localización"
        })
    }
}
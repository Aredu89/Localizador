const mongoose = require('mongoose')
const Loc = mongoose.model('Location')

const sendJsonResponse = (res, status, content) => {
    res.status(status)
    res.json(content)
}

//Función para agregar un comentario como subdocumento
//a su correspondiente documento padre
const doAddReview = (req, res, location) => {
    if (!location) {
        sendJsonResponse(res, 404, {
            "message": "No se encontró la localización"
        })
    } else {
        location.reviews.push({
            author: req.body.author,
            rating: req.body.rating,
            reviewText: req.body.reviewText
        })
        location.save((err, location) => {
            var thisReview
            if (err) {
                console.log(err)
                sendJsonResponse(res, 400, err)
            } else {
                updateAverageRating(location._id)
                thisReview = location.reviews[location.reviews.length - 1]
                sendJsonResponse(res, 201, thisReview)
            }
        })
    }
}

//Actualizar el rating promedio
const updateAverageRating = (locationid) => {
    Loc
        .findById(locationid)
        .select('rating reviews')
        .exec(
        (err, location) => {
            if (!err) {
                doSetAverageRating(location)
            }
        })
}

//Setear el rating promedio
const doSetAverageRating = (location) => {
    let i, reviewCount, ratingAverage, ratingTotal
    if (location.reviews && location.reviews.length > 0) {
        reviewCount = location.reviews.length
        ratingTotal = 0
        for (i = 0; i < reviewCount; i++) {
            ratingTotal = ratingTotal + location.reviews[i].rating
        }
        ratingAverage = parseInt(ratingTotal / reviewCount, 10)
        location.rating = ratingAverage
        location.save((err) => {
            if (err) {
                console.log(err)
            } else {
                console.log("Raiting promedio actualizado", ratingAverage)
            }
        })
    }
}

//Crear un comentario
module.exports.reviewsCreate = (req, res) => {
    let locationId = req.params.locationid
    if (locationId) {
        Loc
            .findById(locationId)
            .select('reviews')
            .exec(
                (err,location) => {
                    if (err) {
                        sendJsonResponse(res, 400, err)
                    } else {
                        doAddReview(req,res,location)
                    }
                }
            )
    } else {
        sendJsonResponse(res,404, {
            "message": "No se encontró el Id de la localización"
        })
    }
}

//Devolver un comentario sobre una locación específica
module.exports.reviewsReadOne = (req, res) => {
    //Vemos si las variables están en el requerimiento
    if (req.params && req.params.locationid && req.params.reviewid) {
        Loc
            .findById(req.params.locationid)
            //.select('name reviews')
            .exec((err, location) => {
                let response, review
                if (!location) {
                    sendJsonResponse(res, 404, {
                        "message": "Id de la localizacion no encontrado"
                    })
                    return
                //Si la base de datos devuelve un error.
                } else if (err) {
                    sendJsonResponse(res, 404, err)
                    return
                }
                if (location.reviews && location.reviews.length > 0) {
                    //Se obtiene el comentario con el id enviado por parametro
                    review = location.reviews.id(req.params.reviewid)
                    if (!review) {
                        //Si no se encuentra un comentario con ese id
                        sendJsonResponse(res, 404, {
                            "message": "Comentario no encontrado"
                        })
                    //Se encuentra el comentario exitosamente
                    } else {
                        //se devuelven solo los datos que nos interesan del documento
                        response = {
                            location : {
                                name : location.name,
                                id : req.params.locationid
                            },
                            review : review
                        }
                        sendJsonResponse(res, 200, response)
                    }
                //Si no se encuentran comentarios    
                } else {
                    sendJsonResponse(res, 404, {
                        "message": "No se encontraron comentarios"
                    })
                }
            })
    } else {
        //Si no hay id de la localizacion en el requerimiento
        sendJsonResponse(res, 404, {
            "message": "No hay id de la localización en el requerimiento"
        })
    }
}

//Actualizar un comentario
module.exports.reviewsUpdateOne = (req, res) => {
    //Verifico que los parámetros hayan sido enviados
    if (!req.params.locationid || !req.params.reviewid) {
        sendJsonResponse(res, 404, {
            "message": "Not found, El id de la localizacion y el comentario son necesarios"
        })
        return
    }
    //Utilizo el modelo de Mongoose
    Loc
        .findById(req.params.locationid)
        .select('reviews')
        .exec(
            (err, location) => {
                let thisReview
                if (!location) {
                    sendJsonResponse(res, 404, {
                        "message": "id de la localización no encontrado"
                    })
                    return
                } else if (err) {
                    sendJsonResponse(res, 400, err)
                    return
                }
                if (location.reviews && location.reviews.length > 0) {
                    thisReview = location.reviews.id(req.params.reviewid)
                    if (!thisReview) {
                        sendJsonResponse(res, 404, {
                            "message": "id del comentario no encontrado"
                        })
                    } else {
                        //Si no hay errores actualizo el documento temporal
                        thisReview.author = req.body.author
                        thisReview.rating = req.body.rating
                        thisReview.reviewText = req.body.reviewText
                        //Envío los cambios a la BD
                        location.save((err, location) => {
                            if (err) {
                                sendJsonResponse(res, 404, err)
                            } else {
                                updateAverageRating(location._id)
                                sendJsonResponse(res, 200, thisReview)
                            }
                        })
                    }
                } else {
                    //Si la consulta a la BD no devuelve ningún documento
                    sendJsonResponse(res, 404, {
                        "message": "No hay comentarios para actualizar"
                    })
                }
            }
        )
}

module.exports.reviewsDeleteOne = (req, res) => {
    if (!req.params.locationid || !req.params.reviewid) {
        sendJsonResponse(res, 404, {
            "message": "Not found, el id de la locación y el comentario son requeridos"
        })
        return
    }
    Loc
        .findById(req.params.locationid)
        .select('reviews')
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
                if (location.reviews && location.reviews.length > 0) {
                    if (!location.reviews.id(req.params.reviewid)) {
                        sendJsonResponse(res, 404, {
                            "message": "No se encontró el id del comentario"
                        })
                    } else {
                        location.reviews.id(req.params.reviewid).remove()
                        location.save((err) => {
                            if (err) {
                                sendJsonResponse(res, 404, err)
                            } else {
                                updateAverageRating(location._id)
                                sendJsonResponse(res, 204, null)
                            }
                        })
                    }
                } else {
                    sendJsonResponse(res, 404, {
                        "message": "No se encontraron comentarios para eliminar"
                    })
                }
            }
        )
}
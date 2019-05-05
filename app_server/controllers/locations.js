var request = require('request');
var apiOptions = {
    server : "http://localhost:3000"
};
if (process.env.NODE_ENV === 'production') {
    apiOptions.server = "https://guarded-stream-17787.herokuapp.com";
}
//Funcion para renderizar el formulario para agregar comentarios
var renderReviewForm = function(req,res) {
    res.render('location-review-form', { 
        title: 'Agregar Comentario',
        pageHeader: {
            title: 'Comentario sobre Starcups'
        }
    });
};

//Función para mostrar errores
var _showError = function (req, res, status) {
    var title, content;
    if (status === 404) {
        title = "404, pagina no encontrada";
        content = "Oh! Parece que no podemos encontrar la página";
    } else {
        title = status + ", algo esta mal";
        content = "Algo, en algun lugar, falló";
    }
    res.status(status);
    res.render('generic-text', {
        title : title,
        text : content
    });
};

//Función para renderizar el homepage
var renderHomepage = function(req, res, responseBody){
    var message;
    if (!(responseBody instanceof Array)) {
        message = "La API tuvo un error al buscar localizaciones";
        responseBody = [];
    } else {
        if (!responseBody.length) {
            message = "No se encontraron localizaciones";
        }
    }
    res.render('locations-list', {
        title: 'Localizador',
        pageHeader: {
            title: 'Localizador',
            strapline: 'Encontrá lugares para trabajar con wifi cerca tuyo!'
        },
        sidebar: 'Buscando wifi? Localizador te ayuda a encontrar lugares para trabajar cuando estás fuera de casa.',
        locations: responseBody,
        message: message
    });
};

//Función para renderizar la página de detalles
var renderDetailPage = function (req, res, locDetail) {
    res.render('location-info', {
        title: locDetail.name,
        pageHeader: {
            title: locDetail.name
        },
        sidebar: {
            context: ' está en Localizador porque tiene acceso a wi fi y espacio para sentarse con tu laptop y trabajar.',
            callToAction: 'Si estuviste en este lugar y te gustó - o si no - por favor dejanos tus comentarios para ayudar a otras personas como vos.'
        },
        location: locDetail
    })
}

/* GET 'home' page */
module.exports.homelist = function(req, res){
    var requestOptions, path;
    path = '/api/locations';
    requestOptions = {
        url : apiOptions.server + path,
        method : "GET",
        json : {},
        qs : {
            lng : -0.7992599,
            lat : 51.378091,
            maxDistance : 20
        }
    };
    request(
        requestOptions,
        function(err, response, body) {
            //Concatenamos la m a la distancia
            var i, data;
            data = body;
            if (response.statusCode === 200 && data.length) {
                for(i=0;i<data.length;i ++) {
                    data[i].distance = data[i].distance + "m";
                }
            } else {
                _showError(req, res, response.statusCode);
            }
            renderHomepage(req, res, data);
        }
    );
};

/* GET 'Location info' page */
module.exports.locationInfo = function(req, res){
    var requestOptions, path;
    path = "/api/locations/" + req.params.locationid;
    requestOptions = {
        url : apiOptions.server + path,
        method : "GET",
        json : {}
    };
    request(
        requestOptions,
        function(err, response, body) {
            var data = body;
            if (response.statusCode === 200) {
                data.distance = data.distance + "m";
                renderDetailPage(req, res, data);
            } else {
                _showError(req, res, response.statusCode);
            }
        }
    );
};

/* GET 'Add review' page */
module.exports.addReview = function(req, res){
    renderReviewForm(req,res);
};

/*Agregar comentario*/
module.exports.doAddReview = function(req,res){
    var requestOptions, path, locationid, postdata;
    locationid = req.params.locationid;
    path = "/api/locations/" + locationid + '/reviews';
    postdata = {
        author: req.body.name,
        rating: parseInt(req.body.calificacion, 10),
        reviewText: req.body.comentario
    };
    requestOptions = {
        url : apiOptions.server + path,
        method : "POST",
        json : postdata
    };
    request(
        requestOptions,
        function(err, response, body) {
            if (response.statusCode === 201) {
                res.redirect('/location/' + locationid);
            } else {
                _showError(req, res, response.statusCode);
            }
        }
    );
};
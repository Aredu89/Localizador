/* GET 'home' page */
module.exports.homelist = function(req, res){
    res.render('locations-list', { 
        title: 'Localizador',
        pageHeader: {
            title: 'Localizador',
            strapline: 'Encontrá lugares para trabajar con wifi cerca tuyo!'
        },
        sidebar: 'Buscando wifi? Localizador te ayuda a encontrar lugares para trabajar cuando estás fuera de casa.',
        locations: [
            {
                name: 'Starcups',
                address: 'Av Velez Sarsfield 555, Córdoba',
                rating: 2,
                facilities: ['Bebidas calientes','Premium wifi','Tragos'],
                distance: '100m'
            },
            {
                name: 'Temple Bar',
                address: 'Bario Güemes, Córdoba',
                rating: 3,
                facilities: ['Premium wifi','Tragos'],
                distance: '200m'
            },
            {
                name: 'Patio Olmos',
                address: 'Av Velez Sarsfield y San Juan, Córdoba',
                rating: 4,
                facilities: ['Comidas','Premium wifi','Helados'],
                distance: '300m'
            },
        ]
    });
};

/* GET 'Location info' page */
module.exports.locationInfo = function(req, res){
    res.render('location-info', { title: 'Detalles' });
};

/* GET 'Add review' page */
module.exports.addReview = function(req, res){
    res.render('location-review-form', { title: 'Agregar Comentario' });
};
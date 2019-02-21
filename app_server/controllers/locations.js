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
    res.render('location-info', { 
        title: 'Detalles',
        pageHeader: {
            title: 'Starcups'
        },
        sidebar: {
            context: ' está en Localizador porque tiene acceso a wi fi y espacio para sentarse con tu laptop y trabajar.',
            callToAction: 'Si estuviste en este lugar y te gustó - o si no - por favor dejanos tus comentarios para ayudar a otras personas como vos.'
        },
        location: {
            name: 'Starcups',
            address: 'Av Velez Sarsfield 555, Córdoba',
            rating: 3,
            facilities: ['Bebidas calientes','Premium wifi','Tragos'],
            coords: {
                lat: '51.455041',
                long: '-0.9690884'
            },
            openingTimes: [
                {
                    days: 'Lunes - Viernes',
                    opening: '7:00 am',
                    closing: '10 pm',
                    closed: false
                },
                {
                    days: 'Sabados',
                    opening: '8:00 am',
                    closing: '7 pm',
                    closed: false
                },
                {
                    days: 'Domingo',
                    closed: true
                }
            ],
            reviews: [
                {
                    author: 'Ariel Rosales',
                    rating: 3,
                    timeStamp: '17 Febrero 2019',
                    reviewText: 'Las instalaciones son muy comodas y tiene un buen wi fi.'
                },
                {
                    author: 'Enzo Mariani',
                    rating: 4,
                    timeStamp: '13 Febrero 2019',
                    reviewText: 'El café no es muy bueno, pero el lugar es cómodo y tranquilo para trabajar.'
                }
            ]
        }
    });
};

/* GET 'Add review' page */
module.exports.addReview = function(req, res){
    res.render('location-review-form', { 
        title: 'Agregar Comentario',
        pageHeader: {
            title: 'Comentario sobre Starcups'
        }
    });
};
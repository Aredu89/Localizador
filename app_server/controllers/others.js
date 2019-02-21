/* GET 'about' page */
module.exports.about = function(req, res){
    res.render('generic-text', { 
        title: 'Nosotros',
        text: 'Localizador fué creado para ayudar a la gente a encontrar lugares para sentarse y trabajar en sus laptops.\n\nLa idea surgió al estudiar nuevas tecnologías de desarrollo web.\n\n'
    });
};
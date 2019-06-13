const React = require('react')
const ReactDOM = require('react-dom')
const Header = require('./header.jsx')
const Footer = require('./footer.jsx')
const Navigation = require('./navigation.jsx')

const About = function(props) {
    return <div>
        <Navigation/>
        <div className="container">
            <Header
                    title="Localizador"
                strapline="  Sobre nosotros"/>
            <div className="row">
                <div className="col-md-12 col-sm-12">
                    <p>
                        Localizador fué creado para ayudar a la gente a encontrar lugares para sentarse y trabajar en sus laptops.
                        <br/>
                        La idea surgió al estudiar nuevas tecnologías de desarrollo web.
                        <br/>
                    </p>
                </div>
            </div>
            <Footer/>
        </div>
    </div>
}

module.exports = About
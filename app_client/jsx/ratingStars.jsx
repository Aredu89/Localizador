const React = require('react')
const ReactDOM = require('react-dom')

const RatingStars = function (props) {
    var ruta1, ruta2, ruta3, ruta4, ruta5;
    {ruta1 = (props.rating < 1) ? 'white_star.png' : 'black_star.png'}
    {ruta1 = '../images/'+ruta1}
    {ruta2 = (props.rating < 2) ? 'white_star.png' : 'black_star.png'}
    {ruta2 = '../images/'+ruta2}
    {ruta3 = (props.rating < 3) ? 'white_star.png' : 'black_star.png'}
    {ruta3 = '../images/'+ruta3}
    {ruta4 = (props.rating < 4) ? 'white_star.png' : 'black_star.png'}
    {ruta4 = '../images/'+ruta4}
    {ruta5 = (props.rating < 5) ? 'white_star.png' : 'black_star.png'}
    {ruta5 = '../images/'+ruta5}
    return <span>
        <img className="stars" src={ruta1}/>
        <img className="stars" src={ruta2}/>
        <img className="stars" src={ruta3}/>
        <img className="stars" src={ruta4}/>
        <img className="stars" src={ruta5}/>
    </span>
}

module.exports = RatingStars
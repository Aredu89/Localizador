const React = require('react')
const ReactDOM = require('react-dom')

const Header = require('./header.jsx')
const Footer = require('./footer.jsx')
const RatingStars = require('./ratingStars.jsx')
const Error = require('./error.jsx')
const Navigation = require('./navigation.jsx')
const {Link} = require('react-router')
const {connect} = require('react-redux')
const {fetchLocationDetailsActionCreator} = require('../modules/locations.js')

class LocationDetails extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            location: [],
            error: null,
            isLoading: true
        }
    }
    convertDate(date) {
      let d = new Date(date)
      return d.getDate() + '-' + d.getMonth() + '-' + d.getFullYear() + ' ' + d.getHours() + ':' + d.getMinutes()
    }
    componentDidMount() {
        fetch("/api/locations/"+this.props.params.id)
            .then((response)=>response.json())
            .then((location)=>
                this.setState({location: location,
                              isLoading: false}))
            .catch((error)=>this.setState({error: error.message, isLoading: false}))
    }

    render(){
        const {location, error, isLoading} = this.state
        return <div>
            <Navigation/>
            <div className="container">
                <Header
                    title={location.name}
                    strapline="Informacion"/>
                {error ? <Error errorMessage = {error}/> : null}
                <div className="row">
                    <div className="col-xs-12 col-md-9">
                        <div className="row">
                            <div className="col-xs-12 col-sm-6">
                                <RatingStars rating={location.rating}/>
                                <p>{location.address}</p>
                                <div className="card border-primary mb-3">
                                    <div className="card-header">
                                        <h4 className="card-title">Horario de atención</h4>
                                    </div>
                                    <div className="card-body">
                                      {!isLoading ? (
                                        location.openingTimes.map((time, index)=>
                                          <p className="card-text" key={index}>
                                              {time.days + ' :  '} 
                                              {time.closed ? (
                                                    <span>Cerrado</span>
                                                  ) : (
                                                    <span>{time.opening + " - " + time.closing}</span>
                                                  )
                                              }
                                          </p>
                                        )
                                      ) : (
                                        <div className="spinner-border text-primary" role="status">
                                          <span className="sr-only">Loading...</span>
                                        </div>
                                      )}
                                       
                                    </div>
                                </div>
                                <div className="card border-primary mb-3">
                                    <div className="card-header">
                                        <h4 className="card-title">Instalaciones</h4>
                                    </div>
                                    <div className="card-body">
                                        <div className="card-text">
                                            {!isLoading ? (
                                              location.facilities.map((facility) =>
                                                <span className="badge badge-info tags">{facility}</span>
                                              )
                                            ) : (
                                              <div className="spinner-border text-primary" role="status">
                                                <span className="sr-only">Loading...</span>
                                              </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xs-12 col-sm-6 location-map">
                                <div className="card mb-3">
                                    <h4 className="card-header">Ubicación</h4>
                                    <img className="mapa" src="../images/mapa1.png" alt="Card Image"/>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-12 col-lg-12">
                                <div className="card border-primary mb-3">
                                    <div className="card-header">
                                        <h4 className="card-title">
                                            Comentarios de Clientes
                                            <Link to={'/location/'+location._id+'/review/new'}>
                                                <button className="btn float-right btn-outline-primary" type="button">Comentar</button>
                                            </Link>
                                        </h4>
                                    </div>
                                    <table className="table table-hover">
                                        {!isLoading ? (
                                          location.reviews.map((review, index)=>
                                              <tbody key={index}>
                                                  <tr className="table-primary">
                                                      <td>
                                                          <RatingStars rating={review.rating}/>
                                                          <span className="reviewAuthor">
                                                              <b>{' ' + review.author + ' '}</b>
                                                          </span>
                                                          <small className="reviewTime">
                                                              <k>{this.convertDate(review.createdOn)}</k>
                                                          </small>
                                                      </td>
                                                  </tr>
                                                  <tr className="table-secondary">
                                                      <td>
                                                          <span>{review.reviewText}</span>
                                                      </td>
                                                  </tr>
                                              </tbody>
                                          )
                                        ) : (
                                          <div className="spinner-border text-primary" role="status">
                                            <span className="sr-only">Loading...</span>
                                          </div>
                                        )}
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-12 col-md-3">
                        <p className="lead">
                            {location.name} está en el Localizador porque tiene acceso a wifi y espacio para sentarse con tu laptop y trabajar.
                        </p>
                        <p>
                            Si has estado en este lugar, por favor dejá tu comentario para ayudar a otras personas como vos.
                        </p>
                    </div>
                </div>
                <Footer/>
            </div>
        </div>
    }
}

module.exports = LocationDetails
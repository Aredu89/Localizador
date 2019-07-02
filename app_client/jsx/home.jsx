const React = require('react')
const ReactDOM = require('react-dom')
const Header = require('./header.jsx')
const Footer = require('./footer.jsx')
const RatingStars = require('./ratingStars.jsx')
const Error = require('./error.jsx')
const Navigation = require('./navigation.jsx')
const {Link} = require('react-router')
const {connect} = require('react-redux')
const {fetchLocationsActionCreator} = require('../modules/locations.js')

class Home extends React.Component {
    componentDidMount() {
        fetch("/api/locations")
            .then((response)=>response.json())
            .then((locations)=>this.props.fetchLocations(locations))
            .catch((error)=>this.setState({error: error.message, isLoading: false}))
    }
    render() {
        const {
            children,
            locations= [],
            error= null,
            isLoading= true,
            params = {}
        } = this.props
        return <div>
            <Navigation/>
            <div className="container">
                <Header
                    title="Localizador"
                strapline="Encontrá lugares para trabajar con wifi cerca tuyo!"/>
                <div className="row">
                    <div className="col-xs-12 col-sm-8">
                        <label className="col-form-label" htmlFor="inputDefault">
                            Filtro
                        </label>
                        <input id="exampleInputEmail1" type="text" className="form-control" name="filter"/>
                        <br/>
                        {/*<Error errorMessage = {this.state.error}/>*/}
                        <Error errorMessage = {error}/>
                        {!isLoading ? (
                          locations.map((location, index)=>
                              <div className="card text-white bg-primary mb-3">
                                  <Link to={'/location/'+location._id}>
                                      <h4>
                                          <div className="card-header">
                                              {location.name+' '}
                                              <small className="rating-stars"><RatingStars rating={location.rating}/></small>
                                              <span className="badge float-right badge-secondary" key={index}>
                                                  {location.distance}m
                                              </span>
                                          </div>
                                      </h4>
                                  </Link>
                                  <div className="card-body">
                                      <p className="card-text">
                                          {location.address}
                                          <br/>
                                          <br/>
                                          {location.facilities.map((facility)=>
                                              <span className="badge badge-info tags" key={index}>
                                                  {facility}
                                              </span>
                                          )}
                                      </p>
                                  </div>
                              </div>
                            )
                          ) : (
                            <div className="spinner-border text-primary" role="status">
                              <span className="sr-only">Loading...</span>
                            </div>
                          )}
                    </div>
                    <div className="col-xs-12 col-sm-4">
                        <p className="lead">
                            Buscando wifi? Localizador te ayuda a encontrar lugares para trabajar cuando estás fuera de casa.
                        </p>
                    </div>
                </div>
                <Footer/>
            </div>
        </div>
    }
}

module.exports = connect(({locations}) => ({
  locations: locations.all,
  isLoading: locations.isLoading
}), {
  fetchLocations: fetchLocationsActionCreator
})(Home)
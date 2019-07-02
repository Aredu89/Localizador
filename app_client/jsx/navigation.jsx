const React = require('react')
const ReactDOM = require('react-dom')
const {Link} = require('react-router')

const Navigation = function(props) {
    return <div>
        <nav className = "navbar navbar-expand-lg navbar-dark bg-primary">
            <Link className="navbar-brand" to="/">Localizador</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div id="navbarColor01" className="collapse navbar-collapse">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/about">
                            About
                            <span className="sr-only">(current)</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
}

Navigation.contextTypes = {
    router: React.PropTypes.object.isRequired
}

module.exports = Navigation
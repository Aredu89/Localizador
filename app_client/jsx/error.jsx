const React = require('react')
const ReactDOM = require('react-dom')

const Error = function (props) {
    if (props.errorMessage) {
        return <div className="alert alert-dismissible alert-warning" role="alert">
            <button className="close" type="button" data-dismiss="alert">x</button>
            <h4 className="alert-heading">Cuidado!</h4>
            <p className="mb-0">
                {props.errorMessage}
            </p>
        </div>
    } else {
        return null;
    }
}

module.exports = Error
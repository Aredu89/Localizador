const React = require('react')
const ReactDOM = require('react-dom')

const Header = function (props) {
    return <div id="banner" className="page-header">
                <div className="row">
                    <div className="col-ls-12">
                        <h2>
                            {props.title + '  '}
                            <small className="text-muted">
                                {props.strapline}
                            </small>
                        </h2>
                        <hr className="my-4"/>
                    </div>
                </div>
            </div>
}
Header.defaultProps = {
    title: "Pagina",
    strapline: "  del localizador"
}

module.exports = Header
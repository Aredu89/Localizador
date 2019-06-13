const React = require('react')
const ReactDOM = require('react-dom')

const Header = require('./header.jsx')
const Footer = require('./footer.jsx')
const Error = require('./error.jsx')
const Navigation = require('./navigation.jsx')

class AddReview extends React.Component {
    constructor(props) {
        super(props)
        this.handleChangeName = this.handleChangeName.bind(this)
        this.handleSelectChange = this.handleSelectChange.bind(this)
        this.handleChangeTextArea = this.handleChangeTextArea.bind(this)
        this.handleKeyUp = this.handleKeyUp.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.state = {
            error: '',
            rating: '5'
        }
    }
    handleSelectChange(event){
        this.setState({rating: event.target.value})
    }
    handleChangeName(event){
        this.setState({author: event.target.value})
    }
    handleChangeTextArea(event){
        this.setState({reviewText: event.target.value})
    }
    handleSubmit(){
        console.log(this.state)
        fetch("/locations/"+this.props.params.id+"/reviews",
            {
                method: 'POST',
                body: JSON.stringify(this.state),
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then((response)=>response.json())
            .then((data)=>{console.log('Submitted: ', data)
                           this.props.router.push('/location/'+this.props.params.id)})
            .catch((error)=>this.setState({error: error.message}))
    }
    //Manejar tecla enter en el form
    handleKeyUp(event){
        if (event.KeyCode == 13) return this.handleSubmit()
    }
    render() {
        return <div>
        <Navigation/>
        <div className="container">
            <Header
                title="Agrega"
                strapline="tu comentario..."/>
            <div className="row">
                <div className="col-xs-12 col-md-6">
                    <form id="addReview" name="addReview" role="form" className="form-horizontal" onSubmit={this.handleSubmit} onKeyUp={this.handleKeyUp}>
                        <Error
                            errorMessage={this.state.error}/>
                        <div className="form-group">
                            <label htmlFor="name" >Nombre</label>
                            <input id="exampleInputEmail1" className="form-control" type="text" placeholder="Tu nombre..." name="name" required="required" value={this.state.author} onChange={this.handleChangeName.bind(this)}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="clasificacion">Clasificacion</label>
                            <select id="exampleSelect1" className="form-control" name="clasificacion" value={this.state.rating} onChange={this.handleSelectChange}>
                                <option value='5'>5</option>
                                <option value='4'>4</option>
                                <option value='3'>3</option>
                                <option value='2'>2</option>
                                <option value='1'>1</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="comentario">Comentario</label>
                            <textarea id="exampleTextarea" className="form-control" required="required" rows="5" name="review" value={this.state.reviewText} onChange={this.handleChangeTextArea.bind(this)}/>
                        </div>
                        <input type="button" value="Agregar Comentario" className="btn float-right btn-primary" onClick={this.handleSubmit}/>
                    </form>
                </div>
            </div>
            <Footer/>
        </div>
    </div>
    }
}
AddReview.propTypes = {
    name: PropTypes.string,
    textArea: PropTypes.string,
    selectedValue: PropTypes.number
}

module.exports = AddReview
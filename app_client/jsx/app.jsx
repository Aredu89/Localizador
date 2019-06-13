const React = require('react')
const ReactDOM = require('react-dom')
const ReactRouter = require('react-router')
const History = require('history')

const Home = require('./home.jsx')
const About = require('./about.jsx')
const LocationDetails = require('./locationDetails.jsx')
const AddReview = require('./addReview.jsx')

let {Router,
    Route
} = ReactRouter

let hashHistory = ReactRouter.useRouterHistory(History.createHashHistory)({
    queryKey: false
})

ReactDOM.render(
    <Router history = {hashHistory}>    
        <Route path="/" component={Home} />
        <Route path="/about" component={About}/>
        <Route path="/location/:id" component={LocationDetails}/>
        <Route path="/location/:id/review/new" component={AddReview}/>
    </Router>,
    document.getElementById('content')
)
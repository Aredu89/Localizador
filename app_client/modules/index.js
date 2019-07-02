const {combineReducers} = require('redux')
const {
    reducer: locations
} = require('./locations')

module.exports = combineReducers({
    locations
})
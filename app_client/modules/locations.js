const { handleActions } = require('redux-actions')

const FETCH_LOCATIONS = 'locations/FETCH_LOCATIONS'
const FETCH_LOCATION_DETAILS = 'locations/FETCH_LOCATION_DETAILS'

const initialState = {
    locations: [],
    locationDetails: {}
}

module.exports = {
    fetchLocationsActionCreator: (locations) => ({
        type: FETCH_LOCATIONS,
        locations
    }),
    fetchLocationDetailsActionCreator: (id) => ({
        type: FETCH_LOCATION_DETAILS,
        id
    }),
    reducer: handleActions({
        [FETCH_LOCATIONS]: (state, action) => ({
            ...state,
            all: action.locations,
            isLoading: false
        }),
        [FETCH_LOCATION_DETAILS]: (state, action) => ({
            ...state,
            current: state.all[action.id], //not working
            isLoading: false
        })
    }, initialState)
}
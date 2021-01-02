import * as actionTypes from '../actions/types'

const initialState = {
    candidates: null,
    alertType: null,
    alertMsg: null,
    loading: false,
    shortlisted: [],
    rejected: []
}

const shortlist = (state, action) => {

    //check if present in rejected, then slice
    const index = state.rejected.indexOf(action.candidate)
    if (index > -1) {
        state.rejected.splice(index, 1)
    }

    //check if already in shortlisted, dont add again
    const index2 = state.shortlisted.indexOf(action.candidate)
    if (index2 > -1) {
        return { ...state }
    }

    //add if above cases fail
    return {
        ...state,
        shortlisted: state.shortlisted.concat(action.candidate)
    }
}

const reject = (state, action) => {
    //check if present in shortlisted, then slice
    const index = state.shortlisted.indexOf(action.candidate)
    if (index > -1) {
        state.shortlisted.splice(index, 1)
    }

    //check if already in rejected, dont add again
    const index2 = state.rejected.indexOf(action.candidate)
    if (index2 > -1) {
        return { ...state }
    }

    //add if above cases fail
    return {
        ...state,
        rejected: state.rejected.concat(action.candidate)
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOAD_START: return { ...state, loading: true }
        case actionTypes.LOAD_CANDIDATES: return { ...state, candidates: action.candidates, loading: false }
        case actionTypes.ERROR: return { ...state, loading: false, candidates: null }
        case actionTypes.SET_ALERT: return { ...state, loading: false, alertMsg: action.alertMsg, alertType: action.alertType }
        case actionTypes.REMOVE_ALERT: return { ...state, alertMsg: null, alertType: null }
        case actionTypes.SHORTLIST: return shortlist(state, action)
        case actionTypes.REJECT: return reject(state, action)
        default: return state
    }
}

export default reducer
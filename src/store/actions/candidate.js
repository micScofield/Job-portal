import axios from 'axios'

import * as actionTypes from './types'

const loadCandidates = data => ({ type: actionTypes.LOAD_CANDIDATES, candidates: data })
const setShortlisted = candidate => ({ type: actionTypes.SHORTLIST, candidate: candidate })
const setRejected = candidate => ({ type: actionTypes.REJECT, candidate: candidate })

const removeAlert = () => {
    return {
        type: actionTypes.REMOVE_ALERT
    }
}

export const fetchCandidates = () => async dispatch => {
    dispatch({ type: actionTypes.LOAD_START })
    try {
        const res = await axios.get('https://s3-ap-southeast-1.amazonaws.com/he-public-data/users49b8675.json')
        // console.log(res.data)
        dispatch(loadCandidates(res.data))
    } catch (error) {
        console.log(error)
        setAlert('danger', 'Some error occurred, please try again !')
    }
}

//for setting alerts
export const setAlert = (type, msg) => dispatch => {
    console.log('dispatching alert')
    dispatch({
        type: actionTypes.SET_ALERT,
        alertMsg: msg,
        alertType: type
    })
    setTimeout(() => { dispatch(removeAlert()) }, 700)
}

export const shortlist = (candidate, history) => dispatch => {
    dispatch(setShortlisted(candidate))
    dispatch(setAlert('success', 'Candidate Shortlisted !'))
    history.push('/')
}

export const reject = (candidate, history) => dispatch => {
    dispatch(setRejected(candidate))
    dispatch(setAlert('danger', 'Candidate Rejected !'))
    history.push('/')
}
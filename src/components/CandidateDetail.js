import { Fragment } from 'react'
import { connect } from 'react-redux'

import { shortlist, reject } from '../store/actions/candidate'

const CandidateDetail = ({ history, match, candidate: { loading, candidates }, shortlist, reject }) => {

    //!loading && console.log(candidates)

    let candidateById = null
    if (!loading && candidates) {
        candidateById = candidates.filter(candidate => {
            return candidate.id === match.params.id
        })
    }

    return candidateById ? <div className='container'>
        <button className='btn btn-large btn-light' onClick={() => history.goBack()}>
            Go Back
        </button>
        <div className='profile-card'>
            <img src={candidateById[0].Image} alt='Poor internet, cant load' />
            <p style={{ fontSize: '2.6rem', fontWeight: 'bold', marginBottom: '5px' }}>{candidateById[0].name}</p>
            <span>
                <button className='btn btn-large btn-primary btn-round' onClick={() => {
                    shortlist(candidateById[0].id, history)
                }}>
                    Shortlist
                </button>
                <button className='btn btn-large btn-dark btn-round' onClick={() => {
                    reject(candidateById[0].id, history)
                }}>
                    Reject
                </button>
            </span>
        </div>
    </div> : <div className='container'>
            <h1>Profile for this candidate not found. Please try again</h1>
            <button className='btn btn-large btn-light' onClick={() => history.push('/')}>
                Go to Home
            </button>
        </div>
}

const mapStateToProps = state => ({
    candidate: state.candidate
})

export default connect(mapStateToProps, { shortlist, reject })(CandidateDetail)
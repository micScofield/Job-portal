import { useEffect, Fragment, useState } from 'react'
import { connect } from 'react-redux'

import { fetchCandidates } from '../store/actions/candidate'
import Spinner from './UI/Spinner'
import Search from './Search'

const Homepage = ({ fetchCandidates, history, candidate: { loading, candidates, alertType, alertMsg, shortlisted, rejected } }) => {

    const [filtered, setFiltered] = useState([])
    useEffect(() => {
        fetchCandidates()
    }, [])

    const searchHandler = (filtered) => {
        setFiltered(filtered)
    }

    let displayCandidates = null
    //shortlisted.length !== 0 && console.log('shortlisted', shortlisted)
    //rejected.length !== 0 && console.log('rejected', rejected)

    if (!loading) {
        displayCandidates = filtered && filtered.length !== 0 ? filtered.map(candidate => <Fragment>
            <div key={candidate.id} className='card' onClick={() => history.push(`/${candidate.id}`)}>
                <img src={candidate.Image} alt='Cant load avatar' />
                <h2>{candidate.name}</h2>
            </div>
        </Fragment>)
            : candidates && candidates.map(candidate => <Fragment>
                <div key={candidate.id} className=' card' onClick={() => history.push(`/${candidate.id}`)}>
                    <img src={candidate.Image} alt='Cant load avatar' />
                    <h2>{candidate.name}</h2>
                </div>
            </Fragment>)
    }

    if (alertMsg !== null) {
        displayCandidates = null
    }

    const alertClasses = ['alert']
    if (alertType === 'success') alertClasses.push('alert-primary')
    else alertClasses.push('alert-dark')

    return loading ? <Spinner /> : <div className='container'>
        {candidates && <Search candidates={candidates} onFilterCandidates={searchHandler} />}

        {alertMsg ? <Fragment><p className={alertClasses.join(' ')}>{alertMsg}</p><Spinner /></Fragment> : null}

        <div className='cards'>
            {displayCandidates}
        </div>
    </div>
}

const mapStateToProps = state => ({
    candidate: state.candidate
})

export default connect(mapStateToProps, { fetchCandidates })(Homepage)
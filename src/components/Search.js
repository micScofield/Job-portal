import { useEffect, useState, Fragment } from 'react'
import { connect } from 'react-redux'

import { setAlert } from '../store/actions/candidate'

import './Search.css'

const Search = ({ onFilterCandidates, candidates, setAlert }) => {
    const [userInputFilter, setUserInputFilter] = useState('')

    useEffect(() => {
        setTimeout(() => {
            if (userInputFilter === '') {
                return onFilterCandidates(candidates)
            }
            if (userInputFilter) {
                const filtered = candidates.slice().filter(candidate => candidate.name.includes(userInputFilter))
                if (filtered.length === 0) {
                    setAlert('danger', 'No results found')
                } else onFilterCandidates(filtered)
            }
        }, 500)

    }, [userInputFilter])

    return (
        <Fragment>
            <div className='Search'>
                <p><strong>Search by Candidate Name</strong></p>
                <input
                    className='input'
                    type='text'
                    id='filterByName'
                    value={userInputFilter}
                    onChange={event => setUserInputFilter(event.target.value)} />
            </div>
        </Fragment>
    )
}

export default connect(null, { setAlert })(Search)
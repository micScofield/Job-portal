import { connect } from 'react-redux'

const Rejected = ({ candidate: { rejected, candidates }, history }) => {

    const homeButton = (
        <button className='btn btn-large btn-light' onClick={() => history.push('/')}>
            Back to Home
        </button>
    )

    const displayCandidates = []
    for (let i in rejected) {
        for (let j in candidates) {
            if (candidates[j].id === rejected[i] ) {
                displayCandidates.push(candidates[j])
            }
        }
    }

    return <div className='container'>
        {homeButton}
        {
            displayCandidates.length === 0 ? <h2 style={{marginTop: '1rem'}}>No rejected candidates yet !</h2> : <div className='cards'>
                {displayCandidates.map(candidate => (
                    <div key={candidate.id} className='card' onClick={() => history.push(`/${candidate.id}`)}>
                        <img src={candidate.Image} alt='Cant load avatar' />
                        <h2>{candidate.name}</h2>
                    </div>
                ))}
            </div>
        }
    </div>
}

const mapStateToProps = state => ({
    candidate: state.candidate
})

export default connect(mapStateToProps)(Rejected)
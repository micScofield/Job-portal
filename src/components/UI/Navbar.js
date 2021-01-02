import { Fragment } from 'react'
import { Link } from 'react-router-dom'

import './Navbar.css'

const Navbar = () => <Fragment>
    <nav className='navbar'>
        <h1>
            <i className="fas fa-users"></i><Link to='/'>Job Portal</Link>
        </h1>
        <ul>
            <li><Link to="/shortlisted">Shortlisted</Link></li>
            <li><Link to="/rejected">Rejected</Link></li>
        </ul>
    </nav>
</Fragment>

export default Navbar
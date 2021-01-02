import { Redirect, Route, Switch, withRouter } from 'react-router'

import Navbar from './components/UI/Navbar'
import Homepage from './components/Homepage'
import CandidateDetail from './components/CandidateDetail'
import Shortlisted from './components/Shortlisted'
import Rejected from './components/Rejected'

import './App.css';

function App() {

  const routes = (
    <Switch>
      <Route path='/' exact component={Homepage} />
      <Route path='/shortlisted' exact component={Shortlisted} />
      <Route path='/rejected' exact component={Rejected} />
      <Route path='/:id' exact component={CandidateDetail} />
      <Redirect to='/' />    
    </Switch>
  )

  return (
    <div>
      <Navbar />
      {routes}
    </div>
  );
}

export default withRouter(App)

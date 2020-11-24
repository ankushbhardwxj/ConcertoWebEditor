import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import App from './App';
import NavBar from './NavBar';
import Cpp from './Cpp';
import Json from './Json'

const Root = props => {
  return (
    <Router>
      <ul>
        <li>
          <Link to='/concerto'>
            Concerto Schema Language
          </Link>
        </li>
        <li>
          <Link to='/json'>
            JSON
          </Link>
        </li>
        <li>
          <Link to='/cpp'>
            C++
          </Link>
        </li>
      </ul>
      <Switch>
        <Route path='/concerto'>
          <App />
        </Route>
        <Route path='/json'>
          <Json />
        </Route>
        <Route path='/cpp'>
          <Cpp />
        </Route>
      </Switch>
    </Router>
  )
}

export default Root;
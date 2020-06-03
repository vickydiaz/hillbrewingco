// Redux
import { Provider } from 'react-redux';
import { store } from './store';

import './app.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Homepage from './components/homepage/Homepage';
import Dashboard from './components/dashboard/Dashboard';
import CategoryRecipes from './components/homepage/main/CategoryRecipes';
import Recipe from './components/homepage/main/Recipe';
import Login from './components/dashboard/auth/Login';
import setAuthToken from './utils/setAuthToken';
import Register from './components/dashboard/auth/Register';
import PrivateRoute from './components/dashboard/auth/PrivateRoute';


if (localStorage.token) {
  setAuthToken(localStorage.token);
}


const App = () => {

  return (
    <Provider store={store}>
      <Router>
        <div>
          <Switch>
            <Route exact path='/' component={Homepage} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
            <PrivateRoute exact path='/dashboard' component={Dashboard} />
            <Route exact path='/recipes/:category' component={CategoryRecipes, Homepage} />
            <Route exact path='/recipes/:category/:slug' component={Recipe, Homepage} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;

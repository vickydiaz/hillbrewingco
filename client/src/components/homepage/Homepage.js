import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './layout/Landing';
import CategoryBand from './categories/CategoryBand';
import CategoryRecipes from './main/CategoryRecipes';
import Recipe from './main/Recipe';
import LatestRecipe from './main/LatestRecipe';
import { connect } from 'react-redux';
import { loadUser } from '../../actions/auth';

const Homepage = ({ loadUser }) => {
    useEffect(() => {
        loadUser();
    })

    return (
        <Fragment>
            <Router>
                <Landing />
                <CategoryBand />
                <Switch>
                    <Route exact path='/' component={LatestRecipe} />
                    <Route exact path='/recipes/:category' component={CategoryRecipes} />
                    <Route exact path='/recipes/:category/:slug' component={Recipe} />
                </Switch>
            </Router>
        </Fragment>
    )
}




export default connect(null, { loadUser })(Homepage);
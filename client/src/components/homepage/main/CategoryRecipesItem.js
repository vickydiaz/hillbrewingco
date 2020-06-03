import React, { Fragment } from 'react';
import { url } from '../../../config';
import { selectRecipe } from '../../../actions/recipe';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const CategoryRecipesItem = ({ recipe: { title, subtitle, image, category, slug }, selectRecipe }) => {

    let recipeImage = `${url}/uploads/recipe-img/${image}`;

    const onClick = () => {
        selectRecipe(slug);
        console.log(slug);
    }

    return (
        <Fragment>
            <div className="recipe-card">
                <div className="card-img" style={{backgroundImage: `url(${recipeImage})`}}></div>
                <div className="card-body">
                    <h1>{title}</h1>
                    <p className="muted">{subtitle}</p>
                    <Link to={`/recipes/${category}/${slug}`}><button onClick={onClick}>See Recipe</button></Link>
                </div>
            </div>         
        </Fragment>
    )
}

export default connect(null, { selectRecipe })(CategoryRecipesItem);
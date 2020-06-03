import React from 'react';
import { connect } from 'react-redux';
import RecipeListItem from './RecipeListItem';

const RecipeList = ({ recipes, activeCategory }) => {

    return (
        <div className="dash-card">
            <div className="dash-card-header">
                { 
                    typeof activeCategory === 'string' ? <h4>{activeCategory}</h4> : <h4>Beer Recipes</h4>
                }
                
               
            </div>
            <div className="dash-card-body list">
                <ul>
                    {
                        !activeCategory ? 
                        (recipes.map(recipe => (
                            <RecipeListItem key={recipe._id} recipeTitle={recipe.title} recipeId={recipe._id} recipeUser={recipe.user} />
                        ))) : 
                        ( recipes
                        .filter(recipe => recipe.category === activeCategory)
                        .map(recipe => (
                          <RecipeListItem key={recipe._id} recipeTitle={recipe.title} recipeId={recipe._id} recipeUser={recipe.user} />
                      )))


                     
                    }
                </ul>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    recipes: state.dashboard.recipes,
    activeCategory: state.dashboard.activeCategory
})


export default connect(mapStateToProps, {})(RecipeList);

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getRecipesByCategory, clearSelectedRecipe } from '../../../actions/recipe';
import Spinner from '../layout/Spinner';
import CategoryRecipesItem from './CategoryRecipesItem';
import { selectCategory } from '../../../actions/category';

const CategoryRecipes =  ({ recipe: { recipes, loading }, getRecipesByCategory, match, clearSelectedRecipe }, activeCategory) => {
    useEffect(() => {
        getRecipesByCategory(match.params.category);
        clearSelectedRecipe();
    }, [activeCategory, clearSelectedRecipe, getRecipesByCategory, match.params.category]);
 
    
    return (

        loading ? <Spinner /> : 
           
            <div className="main-container" id="main-container">
                {recipes
                    .map(recipe => (  
                        <CategoryRecipesItem key={recipe._id} recipe={recipe} />
                ))}
            </div>
    )
}

const mapStateToProps = state => ({
    recipe: state.recipe,
    activeCategory: state.category.activeCategory

})

export default connect(mapStateToProps, { getRecipesByCategory, selectCategory, clearSelectedRecipe })(CategoryRecipes);
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getCategories } from '../../../actions/dashboard';
import CategorySidebarItem from './CategorySidebarItem'
import { getAllRecipes } from '../../../actions/dashboard';
import { changeEditMode } from '../../../actions/dashboard'

const CategorySidebar = ({  categories, recipes, getCategories, getAllRecipes, changeEditMode, editMode }) => {
    useEffect(() => {
        getCategories();
        getAllRecipes();
    }, [getCategories, getAllRecipes]);  

    const onNewCategory = () => {
        changeEditMode('addCategory');
    }

    return (
        <div className="dash-card">
            <div className="dash-card-header">
                <img src="../../../../img/beer-categories.png" alt="" className="dash-card-icon" />
            Beer Categories
        </div>
            <div className="dash-card-body">
                <ul>
                    
                    {categories
                        .filter(category => category.title !== 'Latest')
                        .map(category => (
                        <CategorySidebarItem key={category._id} category={category.title} 
                            recipeCount={ recipes.filter(recipe => recipe.category === category.title).length} 
                        />
                    ))}
                    
                </ul>
            </div>

            { editMode !== 'addCategory' && <button id="new-category" className="btn-grey" onClick={onNewCategory} >+ New Category</button> }
        </div>
    )
}


const mapStateToProps = state => ({
    recipes: state.dashboard.recipes,
    editMode: state.dashboard.editMode,
    categories: state.dashboard.categories
});

export default connect(mapStateToProps, { getCategories, getAllRecipes, changeEditMode })(CategorySidebar);
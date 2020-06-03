import React from 'react';
import CategorySidebar from '../categories/CategorySidebar';
import RecipeList from '../recipes/RecipeList';
import AddRecipeForm from '../edits/AddRecipeForm';
import AddCategoryForm from '../edits/AddCategoryForm';
import { connect } from 'react-redux';


const Main = ({ dashboard: { editMode } }) => {
    return (
        <div className="row">
            <div className="col-4">
                <CategorySidebar />
            </div>
            
            <div className="col-8">
                {
                    !editMode ? <RecipeList /> :
                    editMode === 'addCategory' ? <AddCategoryForm /> :
                    editMode === 'addRecipe' || 'editRecipe' ? <AddRecipeForm /> :
            
                    <h2>Error</h2>
                }

            </div>
        </div>
    )
}


const mapStateToProps = state => ({
    dashboard: state.dashboard
})

export default connect(mapStateToProps)(Main);
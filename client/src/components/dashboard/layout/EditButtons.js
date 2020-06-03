import React from 'react';
import { connect } from 'react-redux';
import { changeEditMode } from '../../../actions/dashboard';

const EditButtons = ({ changeEditMode, dashboard: { editMode } }) => {

    const onNewRecipe = () => {
        changeEditMode('addRecipe');
    }

    const onCloseEdit = () => {
        changeEditMode(null);
    }

    return (

        <div className="row align-right">
            {
                !editMode ? 
                    <button onClick={onNewRecipe} className="btn-black">+ New Recipe</button> :
                
                editMode === 'addRecipe' || 'editRecipe' ? 
                    <div className="edit-buttons">
                        <a href="#!" onClick={onCloseEdit}>Cancel</a>
                    </div> :
                
                <h2>Error</h2>
            }

            
        </div>

    )
}

const mapStateToProps = state => ({
    dashboard: state.dashboard
})

export default connect(mapStateToProps, { changeEditMode })(EditButtons);

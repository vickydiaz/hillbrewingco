import React from 'react'; 
import { connect } from 'react-redux';
import { selectEditRecipe } from '../../../actions/dashboard';

const RecipeListItem = ({ recipeTitle, recipeId, recipeUser, loggedInUserId, selectEditRecipe }) => {
    const onClick = () => {
        selectEditRecipe(recipeId);
    }

    return (
        <li>
            <a href="#!">{recipeTitle}</a>
            {
                recipeUser === loggedInUserId && <button onClick={onClick} className="btn-grey">Edit</button>
            }

                 
        </li>
    )
}

const mapStateToProps = state => ({
    loggedInUserId: state.auth.user._id
})

export default connect(mapStateToProps, { selectEditRecipe })(RecipeListItem);
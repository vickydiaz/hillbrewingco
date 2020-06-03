import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { getLatest } from '../../../actions/recipe';
import { url } from '../../../config';
import Spinner from '../layout/Spinner';

const LatestRecipe = ({ selectedRecipe: { title, subtitle, image, paragraphs }, getLatest }) => {
    useEffect(() => {
        getLatest();
    }, [getLatest]);

    let recipeImage = `${url}/uploads/recipe-img/${image}`;

    return (

        !title ? <Spinner /> :

            <Fragment>
                <div className="main-container" id="main-container">
                    <h1>{title}</h1>
                    <p className="muted">{subtitle}</p>
                    <div className="blog-img" style={{ backgroundImage: `url(${recipeImage})` }}></div>

                    {paragraphs.map((paragraph, index) => (
                        <div key={index} className="paragraph-group">
                            <h3>{paragraph.title}</h3>
                            <p>{paragraph.body.replace(/&lt;br>/g, '<br>')}</p>
                        </div>
                    ))}
                </div>
            </Fragment>
    )
}

const mapStateToProps = state => ({
    selectedRecipe: state.recipe.selectedRecipe
});


export default connect(mapStateToProps, { getLatest })(LatestRecipe);
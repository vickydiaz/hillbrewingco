import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { url } from '../../../config';
import { selectRecipe } from '../../../actions/recipe';
import Spinner from '../layout/Spinner';

const Recipe = ({ 
    recipe: {selectedRecipe: { title, subtitle, image, paragraphs }, loading}, 
    match, 
    selectRecipe }) => {
        
    useEffect(() => {
        selectRecipe(match.params.slug);
    }, [match.params.slug, selectRecipe]);

    let recipeImage = `${url}/uploads/recipe-img/${image}`;

    return (

        !title ? <Spinner /> : 

        <Fragment>
            <div className="main-container" id="main-container">
                <h1>{title}</h1>
                <p className="muted">{subtitle}</p>
                <div className="blog-img" style={{ backgroundImage: `url(${recipeImage})` }}></div>

                {paragraphs.map(paragraph => (
                    <div className="paragraph-group">
                    <h3>{paragraph.title}</h3>
                    <p>
                        {paragraph.body.split("\n").map(function(item){
                            return (
                                <span>
                                    {item}
                                    <br />
                                </span>
                            )
                        })}
                    </p>
                </div>
                ))}
            </div>
        </Fragment>
    )
}


const mapStateToProps = state => ({
    recipe: state.recipe
});

export default connect(mapStateToProps, { selectRecipe })(Recipe);

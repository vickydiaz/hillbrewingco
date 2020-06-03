import React from 'react'; 
import { url } from '../../../config';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { hoverCategory, unhoverCategory, selectCategory } from '../../../actions/category';
import { getRecipesByCategory } from '../../../actions/recipe';
 
const CategoryItem = ({ 
    hoverCategory, 
    unhoverCategory,
    selectCategory,
    getRecipesByCategory,
    category: { activeCategory, hover },
    categories: { _id, title, iconActive, iconInactive, iconHover },
    }) => {

    // Hover over category
    const hoverEffect = () => {
       hoverCategory(_id);
    }

    // Unhover over category
    const unhoverEffect = () => {
        unhoverCategory();
    }


    // Select a category
    const onClick = () => {
        selectCategory({ _id, title, iconActive });
        getRecipesByCategory(title);
    }

    return (
        <div className="col">
            
            <div className={`inner-category ${activeCategory._id === _id ? 'active' : ''}`}>

                <Link to={`/recipes/${title}`}> 
                    <div className="icon-wrap" onMouseEnter={hoverEffect} onMouseLeave={unhoverEffect} onClick={onClick} >
                        <img id="icon-image" alt='stfu' src={`${url}${
                            activeCategory._id === _id ? iconActive 
                            : hover === _id ? iconHover 
                            : iconInactive
                        }`} />
                        <p id="icon-link" className={activeCategory._id === _id ? 'active-link' : ''} >{title}</p>

                    
                    </div>
                </Link>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    category: state.category
});

export default connect(mapStateToProps, { hoverCategory, unhoverCategory, selectCategory, getRecipesByCategory })(CategoryItem); 
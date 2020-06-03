import React from 'react';
import { connect } from 'react-redux';
import { selectCategory } from '../../../actions/dashboard';
 
const CategorySidebarItem = ({ category, recipeCount, selectCategory }) => {

    const onClick = () => {
        selectCategory(category);
    }


    return (
        
        <li><a onClick={onClick} href="#!">{category}</a><span className="badge">{recipeCount}</span></li> 
        
    )
}

export default connect(null, { selectCategory })(CategorySidebarItem);
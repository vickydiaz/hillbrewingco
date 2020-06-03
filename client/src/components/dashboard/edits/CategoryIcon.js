import React from 'react';
import { url } from '../../../config';

const CategoryIcon = ({ categoryIconName, onSelectCategory, categoryIconState }) => {
    const onClick = () => {
        onSelectCategory(categoryIconName);
    }    

    return (
        <div className='select-category-icon'>
            <div className={'category-icon-cube ' + ( categoryIconState.iconName === categoryIconName && 'selected-icon' )} onClick={onClick}>
                <img src={`${url}/uploads/category-icons/${categoryIconName}-hover.png`} alt="icon"/>
            </div>
        </div>
    )
}

export default CategoryIcon;

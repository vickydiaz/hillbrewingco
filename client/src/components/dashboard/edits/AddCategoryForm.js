import React from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';
import Alert from '../layout/Alert';
import CategoryIcon from './CategoryIcon';
import { saveCategory } from '../../../actions/dashboard';
import { setAlert } from '../../../actions/alert';


const AddCategoryForm = ({ saveCategory, setAlert }) => {

    const [categoryTitle, setCategoryTitle] = useState('');

    const [categoryIcon, setCategoryIcon] = useState({
        iconName: '',
        iconActive: '',
        iconInactive: '',
        iconHover: ''
    });

    const { iconActive, iconInactive, iconHover } = categoryIcon;

    const availableCategoryIcons = ['growler', 'wineglass', 'stein', 'sour', 'coaster'];


    const onChange = (e) => {
        setCategoryTitle(e.target.value)
    };

    const onSelectCategory = (selectedCategoryIcon) => {
        setCategoryIcon({
            iconName: `${selectedCategoryIcon}`,
            iconActive: `/uploads/category-icons/${selectedCategoryIcon}-active.png`,
            iconInactive: `/uploads/category-icons/${selectedCategoryIcon}-inactive.png`,
            iconHover: `/uploads/category-icons/${selectedCategoryIcon}-hover.png`,
        })
    }
    

    const onSubmit = (e) => {
        e.preventDefault();

        if(categoryTitle === '') {
            return setAlert('Please enter a category name', 'danger')
        }

        if(iconActive === '') {
            return setAlert('Please select an icon', 'danger')
        }

        const formData = {
            title: categoryTitle,
            iconActive,
            iconInactive,
            iconHover
        }

        saveCategory(formData);

        // eslint-disable-next-line no-restricted-globals
        location.reload();
    };

    return (
        <div className="dash-card">
            <div className="dash-card-header">
                Add new Category
            </div>
            <div className="dash-card-body">
                <Alert />
                <form onSubmit={onSubmit}>

                    <div className="form-group">
                        <label htmlFor="name">Category Name</label>
                        <input id="name" type="text" placeholder="Enter category name" name="title" value={categoryTitle} onChange={onChange} />
                    </div>

                    <br/>
                    <label>Select an Icon</label><br /><br/>
                    {
                        availableCategoryIcons.map((category, index) => (
                            <CategoryIcon 
                                key={index} 
                                categoryIconName={category} 
                                onSelectCategory={onSelectCategory} 
                                categoryIconState={categoryIcon}
                            />
                        ))
                    }
                   
                    <br /><br />

                    <div className="edit-buttons">

                        <button className="center edit-btn" type="submit">Save category</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default connect(null, { saveCategory, setAlert })(AddCategoryForm);

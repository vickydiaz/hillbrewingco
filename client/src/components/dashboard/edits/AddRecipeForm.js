import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { saveNewRecipe, updateRecipe, deleteRecipe } from '../../../actions/dashboard';
import { url } from '../../../config';
import Alert from '../layout/Alert';
import { setAlert } from '../../../actions/alert';
import ParagraphInput from './ParagraphInput';


const AddRecipeForm = ({ saveNewRecipe, updateRecipe, setAlert, deleteRecipe, loggedInUserId, categories, dashboard: { editMode, editRecipe } }) => {
    const [formData, setFormdata] = useState({
        title: '',
        subtitle: '',
        category: ''
    });

    const [paragraphData, setParagraphData] = useState([
        { title: 'MALT/GRAIN BILL', body: '' },
        { title: 'HOPS/SCHEDULE', body: '' },
        { title: 'YEAST', body: '' },
        { title: 'DIRECTIONS', body: '' }
    ])

    const [selectedImage, setSelectedImage] = useState(null);

    const { title, subtitle, category } = formData;

    useEffect(() => {
        editMode === null && setSelectedImage(null);
    }, [editMode])

    useEffect(() => {
        if (editMode === 'editRecipe') {
            const { category, title, subtitle, paragraphs, image } = editRecipe;

            setFormdata({
                title,
                subtitle,
                category,
                image
            })

            setParagraphData(paragraphs)
        }
    }, [editMode, editRecipe])

    const onChange = (e) => {
        setFormdata({
            ...formData,
            [e.target.name]: e.target.value
        })
    };

    const onTitleChange = (e) => {
        setParagraphData([

            ...paragraphData
            ],
            paragraphData[e.target.name].title = e.target.value
        )
    }

    const onBodyChange = (e) => {
        setParagraphData([

            ...paragraphData
            ],
            paragraphData[e.target.name].body = e.target.value
        )
    }


    const selectImageFile = (e) => {
        e.preventDefault();

        setSelectedImage(e.target.files[0]);
    };


    const onSubmit = (e) => {
        e.preventDefault();

        if (title === '') {
            return setAlert('Please fill in title', 'danger')
        }

        if (category === '') {
            return setAlert('Please add a category', 'danger')
        }

        const paragraphs = paragraphData.filter(paragraph => paragraph.body !== '');

        const packagedFormData = {
            user: loggedInUserId,
            title,
            subtitle,
            category,
            paragraphs
        };

        if(editMode === 'addRecipe') {
            saveNewRecipe(packagedFormData, selectedImage);
            setSelectedImage(null);

        } else {
            updateRecipe(editRecipe._id, packagedFormData);
            
        }

        // eslint-disable-next-line no-restricted-globals
        // location.reload();
        // add recipe in reducer
    }


    const onDelete = (e) => {
        e.preventDefault();

        // eslint-disable-next-line no-restricted-globals
        const yes = confirm("Sure to delete?");

        if (yes) {
            deleteRecipe(editRecipe._id);
        }
    }



    return (
        <div className="dash-card">
            <div className="dash-card-header">
                Add new Recipe
            </div>
            <div className="dash-card-body">
                <Alert />
                <form onSubmit={onSubmit}>
                    {editRecipe && (<img className="preview-image" src={`${url}/uploads/recipe-img/${editRecipe.image}`} alt="recipeImage"/>)}

                    <input className="custom-file" type="file" accept=".jpg, .jpeg, .png" onChange={selectImageFile} />

                    <div className="form-group">
                        <label htmlFor="name">Recipe Name</label>
                        <input id="name" type="text" placeholder="Enter recipe name" name="title" value={title} onChange={onChange} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="subtitle">Subtitle</label>
                        <input id="subtitle" type="text" placeholder="Enter subtitle" name="subtitle" value={subtitle} onChange={onChange} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="category">Category</label>
                        <select id="category" className="select" name="category" value={category} onChange={onChange}>
                            <option value="" defaultValue>Select a category</option>
                            

                            {
                                categories.filter(category => category.title !== 'Latest')
                                    .map((category, index) => (
                                        <option key={index} value={category.title} >{category.title}</option>
                                    ))
                            }


                        </select>
                    </div>
                    <br /><br />

                    {
                        paragraphData.map((paragraph, index) => (
                            <ParagraphInput key={index} index={index} paragraph={paragraph} onTitleChange={onTitleChange} onBodyChange={onBodyChange} />
                        ))
                    }

                    <div className="edit-buttons">

                        <button className="center edit-btn" type="submit">Save recipe</button>
                        {editMode === 'editRecipe' && (<button className="center edit-btn" onClick={onDelete} style={{ marginLeft: '10px', backgroundColor: 'red' }}>Delete Recipe</button>)}
                    </div>
                </form>
            </div>
        </div>
    )
}


const mapStateToProps = state => ({
    dashboard: state.dashboard,
    loggedInUserId: state.auth.user._id,
    categories: state.category.categories
})

export default connect(mapStateToProps, { saveNewRecipe, updateRecipe, deleteRecipe, setAlert })(AddRecipeForm);

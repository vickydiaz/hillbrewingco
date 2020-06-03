import React, { Fragment, useEffect } from 'react';
import CategoryItem from './CategoryItem';
import { connect } from 'react-redux';
import { getCategories } from '../../../actions/category';
import Spinner from '../../homepage/layout/Spinner';


const CategoryBand = ({ 
    category: { categories, loading }, 
    getCategories 
    }) => {

    useEffect(() => {
        getCategories();
    }, [getCategories]);  
    

    return (

        loading ? <Spinner /> : 

        <Fragment>
            <div className="categories" id="categories">
                <div className="container">

                    {
                        categories.map(category => (
                            <CategoryItem key={category._id} categories={category} />
                        ))
                    }

                </div>
            </div>
        </Fragment>
    )
}


const mapStateToProps = state => ({
    category: state.category
})

export default connect(mapStateToProps, { getCategories })(CategoryBand);
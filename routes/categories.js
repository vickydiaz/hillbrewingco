const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

const { getCategories,
        getCategory,
        createCategory,
        updateCategory,
        deleteCategory 
} = require('../controllers/categories');

router
    .route('/')
    .get(getCategories)
    .post(createCategory);


router
    .route('/:id')
    .get(getCategory)
    .put(updateCategory);
    
module.exports = router;
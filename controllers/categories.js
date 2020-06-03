const errorResponse = require('../utils/error-response');
const asyncHandler = require('../middleware/async');
const Category = require('../models/Category');

// GET api/categories
exports.getCategories = asyncHandler(async (req, res, next) => {
    const categories = await Category.find();
    res.status(200).json(
        { 
        count: categories.length, 
        data:  categories 
    });
});


// POST api/categories  [Create a category]
exports.createCategory = asyncHandler(async (req, res, next) => {

    const category = await Category.create(req.body);
    
    res.status(201).json({ 
        success: true, 
        data: category 
    });
});


// GET api/category/:id  [Get category by Id]
exports.getCategory = asyncHandler(async (req, res, next) => {
    
    const category = await Category.findById(req.params.id);

    if(!category){
        return next(new errorResponse(`ID doesnt exist found`, 404));
    } else {
        res.status(200).json({ data: category });
    }
   
    next(err);
});


// PUT api/categories/:id [Update a category]
exports.updateCategory = asyncHandler(async (req, res, next) => {
    
    let category = await Category.findById(req.params.id);

    if(!category){
        return next(new errorResponse(`Id not found`, 404));
    }

    const filter = { _id: req.params.id };

    recipe =  await Category.findOneAndUpdate(filter, req.body, {
        new: true,
        runValidators: true
    }); 

    res.status(200).json({ data: category });
});
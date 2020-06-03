const path = require('path');
const Recipe = require('../models/Recipe');
const errorResponse = require('../utils/error-response');
const asyncHandler = require('../middleware/async');


// GET api/recipes  [Get all recipes]
exports.getRecipes = asyncHandler(async (req, res, next) => {
    const recipes = await Recipe.find(req.query);
    res.status(200).json(
        { 
        count: recipes.length, 
        data:  recipes 
    });
});


// GET api/recipes/:id  [Get recipe by Id]
exports.getRecipe = asyncHandler(async (req, res, next) => {
    
    const recipe = await Recipe.findById(req.params.id);

    if(!recipe){
        return next(new errorResponse(`ID doesnt exist found`, 404));
    } else {
        res.status(200).json({ data: recipe });
    }
   
    next(err);
});


// POST api/recipes  [Create a recipe]
exports.createRecipe = asyncHandler(async (req, res, next) => {

    // Add user to req.body
    // req.body.user = req.user;

    const recipe = await Recipe.create(req.body);
    
    res.status(201).json({  
        data: recipe 
    });
});


// PUT api/recipes/:id [Update a recipe]
exports.updateRecipe = asyncHandler(async (req, res, next) => {
    
    let recipe = await Recipe.findById(req.params.id);

    if(!recipe){
        return next(new errorResponse(`Id not found`, 404));
    }

    // Make sure user is recipe owner
    if (recipe.user.toString() !== req.user) {
        return next(new errorResponse(`User is not authorized to update this recipe`, 401));
    }

    const filter = { _id: req.params.id };

    recipe =  await Recipe.findOneAndUpdate(filter, req.body, {
        new: true,
        runValidators: true
    }); 

    res.status(200).json({ data: recipe });
});


// DELETE api/recipes/:id  [Delete a recipe]
exports.deleteRecipe = asyncHandler(async (req, res, next) => {
    const recipe = await Recipe.findByIdAndDelete(req.params.id);

    if(!recipe){
        return next(new errorResponse(`Id not found`, 404));
    }

     // Make sure user is recipe owner
     if (recipe.user.toString() !== req.user) {
        return next(new errorResponse(`User is not authorized to delete this recipe`, 401));
    }

    recipe.remove();
    res.status(200).json(recipe);
});


// PUT api/recipes/id/photo  [Upload a photo]
exports.recipePhotoUpload = asyncHandler(async (req, res, next) => {
    const recipe = await Recipe.findById(req.params.id);

    if(!recipe) {
        return next(new errorResponse(`Recipe not found`, 404));
    }


    if(!req.files) {
        return next(new errorResponse(`Please upload a file`, 400));
    }

    
    const file = req.files.file;

    // Make sure image is a photo
    // if(!file.type.startsWith('image')) {
    //     return next(new errorResponse(`Please upload an image file`, 400));
    // }

    // Check file size
    if(file.size > process.env.MAX_FILE_UPLOAD) {
        return next(new errorResponse(`Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`, 400));
    }

    // Create custom file name
    file.name = `photo_${recipe._id}${path.parse(file.name).ext}`;


    // Move the file
        file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
        if(err) {
            console.error(err);
            return next(new errorResponse(`Problem with file upload`, 500)); 
        }

        // Update image in recipe
        await Recipe.findByIdAndUpdate(req.params.id, { image: file.name });

        res.status(200).json({ data: file.name });
    });
});
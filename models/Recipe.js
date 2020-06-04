const mongoose = require('mongoose');
const slugify = require('slugify');

const RecipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a name'],
        unique: true,
        trim: true
    },
    slug: String,
    subtitle: String,
    latest_recipe: {
        type: Boolean,
        default: false
    },
    image: {
        type: String,
        default: 'no-photo.png'
    },
    category: {
        type: String,
        required: [true, 'Please add a category'],
        trim: true
    },
    paragraphs: [Object],
    createdAt: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    }
});

// Create recipe slug from the title
RecipeSchema.pre('save', function(next){
    this.slug = slugify(this.title, { lower: true });
    next();
});



module.exports = mongoose.model('Recipe', RecipeSchema);
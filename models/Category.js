const mongoose = require('mongoose');
const slugify = require('slugify');

const CategorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a category name'],
        unique: true,
        trim: true
    },
    iconActive: {
        type: String,
        default: 'noIconActive.png'
    },
    iconInactive: {
        type: String,
        default: 'noIconInactive.png'
    },
    iconHover: {
        type: String,
        default: 'noIconHover.png'
    }
});



module.exports = mongoose.model('Category', CategorySchema);
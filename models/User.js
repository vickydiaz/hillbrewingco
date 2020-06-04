const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        unique: true
    },
    role: {
        type: String,
        default: 'user'    
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: 3,
        select: false
    }
});


// Encrypt password
UserSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});


// Match user entered password to hashed password
UserSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};


// Sign jwt and return
UserSchema.methods.getSignedJwtToken = function() {
    return jwt.sign(
        {id: this._id }, 
        process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_EXPIRE}
    );
};

module.exports = mongoose.model('User', UserSchema);
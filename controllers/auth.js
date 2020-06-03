const errorResponse = require('../utils/error-response');
const asyncHandler = require('../middleware/async');
const User = require('../models/User');


// POST api/auth/register  [Register user]
exports.register = asyncHandler(async (req, res, next) => {
    const { name, password } = req.body;

    // Create user
    const user = await User.create({
        name,
        password
    });  

    sendTokenResponse(user, 200, res);
});


// POST api/auth/login  [Login user]
exports.login = asyncHandler(async (req, res, next) => {
    const { name, password } = req.body;

    // Validate name and password
    if(!name || !password) {
        return next(new errorResponse('Please provide a name and password', 400));
    }

    // Check for user
    const user = await User.findOne({ name }).select('+password');

    if(!user) {
        return next(new errorResponse('Invalid credentials', 401));
    }


    // Check if password matches
    const isMatch = await user.matchPassword(password);

    if(!isMatch) {
        return next(new errorResponse('Invalid credentials', 401));
    }

    sendTokenResponse(user, 200, res);
});


// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
    
     
    // Create token
    const token = user.getSignedJwtToken();
   
    const options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true
    }

    if(process.env.NODE_ENV === 'production') {
        options.secure = true;
    }


    res
        .status(statusCode)
        .json({ token });    
}


// GET api/auth/logout  [Logout user]
exports.logout = asyncHandler(async (req, res, next) => {
    
    res.cookie('token', 'none', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    });

    res.status(200).json({ data: {} });

    next();
});


// GET api/auth/me  [Get loggedin user]
exports.getMe = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user);

    res.status(200).json({ data: user });

    next();
});


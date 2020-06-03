const jwt = require('jsonwebtoken');
const asyncHandler = require('./async');
const ErrorResponse = require('../utils/error-response');
const User = require('../models/User');

// Protect routes 
exports.protect = asyncHandler(async (req, res, next) => {

        // Get token in the header
        const token = req.header('x-auth-token');

        // Check if no token
        if(!token) {
            return res.status(401).json({ msg: 'No token, authorization denied' });
        }
    
        // Verify token
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            req.user = decoded.id;
    
            next();
    
        } catch (err) {
            
            res.status(401).json({ msg: 'Token is not valid' });
    
        }

});


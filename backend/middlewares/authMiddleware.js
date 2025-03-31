const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { model } = require('mongoose');

// Middleware to protect routes
const protect = async (req, res, next) => {
    try {
        let token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: 'Not authorized, no token' });
        }
        token = token.split(' ')[1]; // Remove 'Bearer' from token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password'); // Exclude password from user object
        next();
    } catch (error) {
        res.status(401).json({ message: 'Not authorized, token failed' });
    }
};


// Middleware to check if user is admin

const admin = (req, res, next) => {
    if(req.user && req.user.role === 'admin') {
        next();
    }else{
        res.status(403).json({ message: 'Not authorized as an admin' });
    }
};

module.exports = { protect, admin };
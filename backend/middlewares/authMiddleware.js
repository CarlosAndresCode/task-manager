const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { model } = require('mongoose');

// Middleware to protect routes
const protect = async (req, res, next) => {
    try {
        // console.log(req.headers.authorization);
        
        let token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: 'Not authorized, no token' });
        }
        token = token.split(' ')[1]; // Remove 'Bearer' from token
        // console.log(token);
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded.userId);
        user = await User.findById(decoded.userId).select('-password'); // Exclude password from user object
        req.user = user; // Attach user to request object
        console.log(user);
        
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
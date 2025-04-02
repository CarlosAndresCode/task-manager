const User = require('../models/User');
const { encryptPassword, comparePassword } = require('../utils/passwordHash');  
// const { generateToken } = require('../utils/generateToken');
const jwt = require('jsonwebtoken');


//Generate JWT token
const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '7d',
    });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @desc    Register a new user
const register = async (req, res) => {
    try {
        const { name, email, password, profileImage, adminInviteToken} = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Please fill all fields' });
        }

        if (!email.includes('@')) {
            return res.status(400).json({ message: 'Please enter a valid email' });
        }

        const userExit= await User.findOne({ email });

        if (userExit) {
            return res.status(400).json({ message: 'User already exists' });
        }

        let role = 'menber';
        if (adminInviteToken && adminInviteToken === process.env.ADMIN_INVITE_TOKEN) {
            role = 'admin';
        }    

        
        const hashedPassword = await encryptPassword(password);
        
        if (!hashedPassword) {
            return res.status(500).json({ message: 'Error hashing password' });
        }

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            profileImage,
            role
        });

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            profileImage: user.profileImage,
            role: user.role,
            token: generateToken(user._id),
        });
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Login user
// @route   POST /api/auth/login
// @desc    Login user
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({ message: 'Please fill all fields' });
        }

        if (!email.includes('@')) {
            return res.status(400).json({ message: 'Please enter a valid email' });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await comparePassword(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            profileImage: user.profileImage,
            role: user.role,
            token: generateToken(user._id),
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// @desc    Get user profile
// @route   GET /api/auth/profile
// @desc    Get user profile
// @access  Private( requires jwt token)
const getProfile = async (req, res) => {
    try {
        console.log(req.user.id);
        
        const user = await User.findById(req.user.id).select('-password');
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private( requires jwt token) 
const updateProfile = async (req, res) => {
    try {
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = { register, login, getProfile, updateProfile };



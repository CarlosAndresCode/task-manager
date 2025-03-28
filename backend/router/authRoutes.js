
const express = require('express');
const { model } = require('mongoose');

const router = express.Router(); 

router.post('/login', loginUser);
router.post('/register', registerUser);
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);

module.exports = router;
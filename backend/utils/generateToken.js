const jwt = require('jsonwebtoken');


//Generate JWT token
const generateToken = async (userId) => {
    return await jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '7d',
    });
};

module.exports = generateToken;
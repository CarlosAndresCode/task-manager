const mongoose = require("mongoose");
const User = require('../models/User');
const Task = require('../models/Task');

const getUsers = async (req, res) => {
    try {
        const users = await User.find({}).select('-password'); // Exclude password from user object
        
        const usersWithTaskCounts = await Promise.all(users.map(async (user) => {
            const pendingTask = await Task.countDocuments({ 
                user: user._id, status: 'pending'
            });
            const inProgressTask = await Task.countDocuments({ 
                user: user._id, status: 'in-progress' 
            });
            const completedTask = await Task.countDocuments({
                 user: user._id, status: 'completed' 
            });

            return {
                ...user._doc, // Include all user properties 
                pendingTask,
                inProgressTask,
                completedTask,
            };
            }));

        res.status(200).json(usersWithTaskCounts);

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const getUserById = async (req, res) => {
    try {
        const userId = req.params.id;

        // Validar si el ID es válido
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }

        const user = await User.findById(userId).select('-password'); // Exclude password from user object

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const pendingTask = await Task.countDocuments({ 
            user: user._id, status: 'pending'
        });
        const inProgressTask = await Task.countDocuments({ 
            user: user._id, status: 'in-progress' 
        });
        const completedTask = await Task.countDocuments({
             user: user._id, status: 'completed' 
        });


        res.status(200).json({
            ...user._doc, // Include all user properties 
            pendingTask,
            inProgressTask,
            completedTask,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;

        // Validar si el ID es válido
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Eliminar el usuario
        await User.findByIdAndDelete(userId);
        res.status(200).json({ message: 'User removed successfully' });
    } catch (error) {
        console.error(error); // Registrar el error para depuración
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

module.exports = { getUsers, getUserById, deleteUser };

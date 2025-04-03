const mongoose = require("mongoose");
const Task = require('../models/Task');


const dashboard = async (req, res) => {
  try {
    const tasks = await Task.find({}).sort({ createdAt: -1 }).limit(10);
    res.status(200).json({
      success: true,
      data: tasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error", error: error.message
    });
  }
}

const createTask = async( req, res) => {
    try {
        const { title, description } = req.body;

        if (!title || !description) {
            return res.status(400).json({
                success: false,
                message: "Title and description are required",
            });
        }

        const newTask = new Task({
            title,
            description,
        });

        await newTask.save();

        res.status(201).json({
            success: true,
            message: "Task created successfully",
            data: newTask,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error", error: error.message
        })
    }
}


module.exports = {
  dashboard,
};


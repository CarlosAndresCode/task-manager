const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    text: {type: String,required: true},
    completed: {type: Boolean, default: false}
});

const taskSchema = new mongoose.Schema({
    title: {type: String,required: true},
    description: {type: String,required: true},
    priority: {type: String, enum: ['low', 'medium', 'high'], default: 'medium'},
    status: { typeof: String, enum: ['pending', 'in-progress', 'completed'], default: 'pending'},
    dueDate: {type: Date, required: true},
    assignedTo: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    createBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    attachments: [{type: String}],
    todoCheckList: [todoSchema],
    progress: {type: Number, default: 0},
}, { timestamps: true });


const Task = mongoose.model('Task', taskSchema);
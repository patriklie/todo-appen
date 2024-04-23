const { required } = require('joi');
const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    completed: {type: Boolean, required: true},
}, { timestamps: true });

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
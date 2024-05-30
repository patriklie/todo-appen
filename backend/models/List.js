const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
    name: { type: String, required: true, maxLength: 20 },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    todos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Todo' }]
}, { timestamps: true });

const List = mongoose.model('List', listSchema);

module.exports = List;
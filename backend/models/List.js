const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
    name: { type: String, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    todos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Todo' }]
});

const List = mongoose.model('List', listSchema);

module.exports = List;
const { required } = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, minLength: 3, maxLength: 30 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minLength: 6 },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

module.exports = User;
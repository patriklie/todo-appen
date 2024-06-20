const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, minLength: 3, maxLength: 30, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minLength: 6 },
    profileImageUrl: { type: String, default: null },
    profileImagePublicId: { type: String, default: null },
    profileHeaderUrl: { type: String, default: null },
    profileHeaderPublicId: { type: String, default: null },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

module.exports = User;
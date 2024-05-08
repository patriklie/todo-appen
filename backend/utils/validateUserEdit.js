const Joi = require('joi');

const userSchema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
})

const validateUserEdit = (user) => {
    return userSchema.validate(user);
};

module.exports = validateUserEdit;
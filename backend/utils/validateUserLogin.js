const Joi = require('joi');

const userSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
})

const validateUserLogin = (user) => {
    return userSchema.validate(user);
};

module.exports = validateUserLogin;
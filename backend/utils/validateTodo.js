const Joi = require('joi');

const todoSchema = Joi.object({
    name: Joi.string().min(3).required(),
    description: Joi.string().required(),
    completed: Joi.boolean().required(),
    list: Joi.string().required(),
})

const validateTodo = (todo) => {
    return todoSchema.validate(todo);
};

module.exports = validateTodo;
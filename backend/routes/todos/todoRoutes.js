const express = require('express');
const router = express.Router();
const validateTodo = require('../../utils/validateTodo');
const Todo = require('../../models/Todo');

router.get("/", (req, res) => {
    res.send("GET REQUEST WORKING")
})

router.post("/", async (req, res) => {
    const { error } = validateTodo(req.body);
    if (error) return res.status(400).send(error);
    console.log(req.body)
    const todo = new Todo({
        name: req.body.name,
        description: req.body.description,
        completed: false,
    })

    try {
        const savedTodo = await todo.save();
        res.send(savedTodo);
    } catch(err) {
        res.status(400).send(err);
    }

})

module.exports = router;
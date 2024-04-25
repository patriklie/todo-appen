const express = require('express');
const router = express.Router();
const validateTodo = require('../../utils/validateTodo');
const Todo = require('../../models/Todo');

router.get("/", async (req, res) => {

    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
})

router.post("/", async (req, res) => {
    const { error } = validateTodo(req.body);

    if (error) {
        console.log("Det var en feil i validering.", req.body);
        return res.status(400).send(error);
    }

    console.log("Dette er backend inni POST: ", req.body)

    const todo = new Todo({
        name: req.body.name,
        description: req.body.description,
        completed: false,
    })

    try {
        const savedTodo = await todo.save();
        console.log("Dette er hva som lagres på serveren", savedTodo)
        res.send(savedTodo);
    } catch(err) {
        res.status(400).send(err);
    }

})

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const deletedTodo = await Todo.findByIdAndDelete(id)
        if(!deletedTodo) {
            return res.status(404).json({ error: "Todo not found"});
        }

        res.json(deletedTodo);

    } catch(error) {
        console.error("Feil ved sletting av Todo: ", error)
        res.status(400).send(error);
    }
})

router.put("/:id/toggle", async (req, res) => {
    const { id } = req.params;

    try {
        const updatedTodo = await Todo.findByIdAndUpdate(id, { completed: !req.body.completed}, { new: true });
        if(!updatedTodo) {
            return res.status(404).json({ error: "Todo not found" });
        }
        console.log(updatedTodo)
        res.json(updatedTodo);

    } catch(error) {
        console.error("Feil ved oppdatering a complete toggle backend: ", error);
        res.status(500).json({ error: "Feil ved oppdatering av Todo" });
    }
  
})

module.exports = router;
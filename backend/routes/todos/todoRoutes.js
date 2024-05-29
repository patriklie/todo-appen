const express = require('express');
const router = express.Router();
const validateTodo = require('../../utils/validateTodo');
const Todo = require('../../models/Todo');
const List = require('../../models/List');

// Henter alle todos i hele collection:
router.get("/", async (req, res) => {

    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
})

// Henter alle Todos fra en liste:
router.get("/listtodos/:id", async (req, res) => {
    const { id } = req.params;

    // finne alle todos som hører til listeID
    const foundTodos = await Todo.find({ list: id })

    res.status(200).send(foundTodos);
})

// Henter en spesifikk todo
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const foundTodo = await Todo.findById(id);
    res.status(200).send(foundTodo);

})

// Legger til en ny TODO i liste:
router.post("/", async (req, res) => {
    const { error } = validateTodo(req.body);

    if (error) {
        console.log("Det var en feil i validering.", req.body);
        return res.status(400).send(error);
    }

    console.log("Dette er backend inni POST: ", req.body)

// Lager en ny todo
    const todo = new Todo({
        name: req.body.name,
        description: req.body.description,
        completed: false,
        list: req.body.list,
    })

    try {
        const savedTodo = await todo.save();
        console.log("Dette er hva som lagres på serveren", savedTodo)

        // Lagrer den nye todo i tilhørende liste
        await List.findByIdAndUpdate(req.body.list,
            { $push: { todos: savedTodo._id } },
            { new: true }
        )

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

        // Fjerner todo fra lista: 
        await List.findByIdAndUpdate(deletedTodo.list,
            { $pull: { todos: deletedTodo._id} }
        );

        res.json(deletedTodo);

    } catch(error) {
        console.error("Feil ved sletting av Todo: ", error)
        res.status(400).send(error);
    }
})

router.put("/:id/toggle", async (req, res) => {
    const { id } = req.params;

    try {
        const updatedTodo = await Todo.findByIdAndUpdate(id, { completed: !req.body.localTodo.completed}, { new: true });
        if(!updatedTodo) {
            return res.status(404).json({ error: "Todo not found" });
        }
        console.log("oppdaterte TODO server: ",updatedTodo)
        res.status(200).send(updatedTodo);

    } catch(error) {
        console.error("Feil ved oppdatering a complete toggle backend: ", error);
        res.status(500).json({ error: "Feil ved oppdatering av Todo" });
    }
  
})

module.exports = router;
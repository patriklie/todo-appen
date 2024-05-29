const express = require('express');
const router = express.Router();
const validateTodo = require('../../utils/validateTodo');
const Todo = require('../../models/Todo');
const List = require('../../models/List');
const authenticateToken = require('../../utils/authenticateToken');
const getUserId = require('../../utils/getUserId');
const User = require('../../models/User');


// Her tenkte jeg sende tilbake alle listene som jeg finner på serveren for bruker ID som etterspør
router.get("/", getUserId, async (req, res) => {
    try {
        const lists = await List.find({ owner: req.userId }).populate('todos')
        console.log("Alle lister fra mongodb logga fra API: ", lists)
        res.send(lists)

    } catch(error) {
        res.status(500).send({ error: error.message });
    }
})

// Her tenkte jeg hente frem EN liste
router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const foundList = await List.findById(id)
    const foundOwner = await User.findById(foundList.owner)

    res.status(200).send({
        listName: foundList.name,
        ownerName: foundOwner.username,
        todos: foundList.todos,
    })

})

// Her oppretter jeg en ny liste på serveren
router.post("/add", authenticateToken, async (req, res) => {
    const { name } = req.body;

    try {

        const newList = new List({
            name,
            owner: req.userId,
            todos: [],
        })

        const savedList = await newList.save();
        res.status(200).send(savedList);

    } catch(error) {
        res.status(500).send({ error: error.message });
    }
})

// Sletter en liste OG alle tilhørende todos 
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const foundList = await List.findByIdAndDelete(id);
        const foundTodos = await Todo.deleteMany({ list: id });
        res.status(200).send(foundList)
    } catch(error) {
        console.error("Feil ved sletting av liste og tilhørende todos: ", error);
        res.status(500).send("Feil ved sletting av liste og tilhørende todos.");
    }

})

module.exports = router;
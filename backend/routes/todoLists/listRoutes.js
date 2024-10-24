const express = require('express');
const router = express.Router();
const Todo = require('../../models/Todo');
const List = require('../../models/List');
const authenticateToken = require('../../utils/authenticateToken');
const getUserId = require('../../utils/getUserId');
const User = require('../../models/User');

// Her tenkte jeg sende tilbake alle listene som jeg finner på serveren for bruker ID som etterspør
router.get("/", getUserId, async (req, res) => {
    try {
        const lists = await List.find({ owner: req.userId }).populate('todos')
        // console.log("Alle lister fra mongodb logga fra API: ", lists)
        return res.send(lists)

    } catch(error) {
        return res.status(500).send({ error: error.message });
    }
})

// Her tenkte jeg hente frem EN liste
router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const foundList = await List.findById(id)
    const foundOwner = await User.findById(foundList.owner)

    return res.status(200).send({
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
        return res.status(200).send(savedList);

    } catch(error) {
        return res.status(500).send(error); 
    }
})

// Sletter en liste og alle tilhørende todos 
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const foundList = await List.findByIdAndDelete(id);
        const foundTodos = await Todo.deleteMany({ list: id });
        return res.status(200).send(foundList)

    } catch(error) {
        console.error("Feil ved sletting av liste og tilhørende todos: ", error);
        return res.status(500).send("Feil ved sletting av liste og tilhørende todos.");
    }
})

// Sletter alle todos tilhørende en liste
router.delete("/:id/todos", async (req, res) => {
    try {
        const { id } = req.params;
        const foundTodos = await Todo.deleteMany({ list: id });
        return res.status(200).send(foundTodos);

    } catch(error) {
        console.log("Feil ved sletting av todos tilhørende i en liste")
        return res.status(500).send(error);
    }
}) 

// Her oppdaterer jeg navnet på en liste
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { newListname } = req.body;
        const updatedList = await List.findByIdAndUpdate(id, { name: newListname }, { new: true})
        return res.status(200).send(updatedList)

    } catch(error) {
        console.log("Feil ved endring av navn på lista");
        return res.status(500).res.send(error);
    }
})

module.exports = router;
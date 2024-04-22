const express = require('express');
require('dotenv').config()
const mongoose = require('mongoose');
const todoRoutes = require('./routes/todos/todoRoutes');

const uri = process.env.MONGODB_URI;
const port = process.env.PORT || 5000;
const app = express();

mongoose.connect(uri)
    .then(() => {
        console.log('Koblet til MongoDB serveren');
    })
    .catch((error) => {
        console.error('Feil ved tilkobling til MongoDB: ', error.message)
    })

app.use(express.json())

app.use("/todos", todoRoutes);

app.get("/", (req, res) => {
    res.send("Hello World!")
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});

const express = require('express');
require('dotenv').config()
const mongoose = require('mongoose');
const cors = require('cors');
const todoRoutes = require('./routes/todos/todoRoutes');
const userRoutes = require('./routes/users/userRoutes');
const listRoutes = require('./routes/todoLists/listRoutes');

const uri = process.env.MONGODB_URI;
const port = process.env.PORT || 5000;
const app = express();

app.use(cors());

mongoose.connect(uri)
    .then(() => {
        console.log('Koblet til MongoDB serveren');
    })
    .catch((error) => {
        console.error('Feil ved tilkobling til MongoDB: ', error.message)
    })

app.use(express.json())
app.use(express.urlencoded({ extended: true }));


app.use("/lists", listRoutes);
app.use("/todos", todoRoutes);
app.use("/users", userRoutes);

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});
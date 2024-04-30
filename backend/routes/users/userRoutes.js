const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const validateUser = require('../../utils/validateUser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authenticateToken = require('../../utils/authenticateToken');
const validateUserLogin = require('../../utils/validateUserLogin');

router.post("/register", async (req, res) => {
    
    const { error } = validateUser(req.body);

    if (error) {
        console.log("Feil i validering");
        return res.status(501).send(error);
    }

    try {

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const newUser = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });

        const token = jwt.sign({ userId: newUser._id }, process.env.SECRET_KEY, { expiresIn: '30d' })

        res.status(200).send(token)

    } catch(error) {
        res.status(500).send(error)
    }

});

router.post("/login", async (req, res) => {

    const { error } = validateUserLogin(req.body);
    if (error) {
        return res.status(501).send(error);
    }

    const { email, password } = req.body;

    try {
        
        const foundUser = await User.findOne({ email });
        if (!foundUser) {
            res.status(401).send("Fant ikke bruker i databasen");
        }

        const match = await bcrypt.compare(password, foundUser.password);
        if(!match) {
            res.status(401).send("Feil passord...")
        }
    
        if (match) {
            const token = jwt.sign({ userId: foundUser._id }, process.env.SECRET_KEY, { expiresIn: '30d' })
            res.status(200).send(token);
        }
    } catch (error) {
        console.error("Feil ved innlogging: ", error);
        res.status(500).send("Intern serverfeil")
    }
})

router.get("/profile", authenticateToken, async (req, res) => {

    const foundUser = await User.findById(req.userId);
    const userData = {
        username: foundUser.username,
        email: foundUser.email,
    }
    return res.status(200).send(userData);
})

router.get("/authtoken", authenticateToken, (req, res) => {
    return res.status(200).json({ message: "Valid token" })
})

module.exports = router;

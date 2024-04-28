const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const validateUser = require('../../utils/validateUser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authenticateToken = require('../../utils/authenticateToken');

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

router.get("/profile", authenticateToken, async (req, res) => {

    const foundUser = await User.findById(req.userId);
    const userData = {
        username: foundUser.username,
        email: foundUser.email,
    }
    return res.status(200).send(userData);
})

module.exports = router;

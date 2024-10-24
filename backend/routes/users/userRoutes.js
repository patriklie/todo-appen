const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const validateUser = require('../../utils/validateUser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authenticateToken = require('../../utils/authenticateToken');
const validateUserLogin = require('../../utils/validateUserLogin');
const validateUserEdit = require('../../utils/validateUserEdit');

router.post("/register", async (req, res) => {
    const { error } = validateUser(req.body);

    if (error) {
        console.log("Feil i validering");
        return res.status(501).send(error);
    }

    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const lowerCaseEmail = req.body.email.toLowerCase();

        const newUser = await User.create({
            username: req.body.username,
            email: lowerCaseEmail,
            password: hashedPassword,
        });

        const token = jwt.sign({ userId: newUser._id }, process.env.SECRET_KEY, { expiresIn: '30d' })
        return res.status(200).send(token)

    } catch(error) {
        return res.status(500).send(error)
    }

});

router.post("/login", async (req, res) => {
    const { error } = validateUserLogin(req.body);

    if (error) {
        return res.status(400).send("Ugyldig epost eller passord.");
    }

    let { email, password } = req.body;

    email = email.toLowerCase();

    try {
        const foundUser = await User.findOne({ email });
        if (!foundUser) {
            return res.status(401).send("Fant ikke bruker i databasen...");
        }

        const match = await bcrypt.compare(password, foundUser.password);
        if(!match) {
            return res.status(401).send("Feil passord...")
        }
    
        if (match) {
            const token = jwt.sign({ userId: foundUser._id }, process.env.SECRET_KEY, { expiresIn: '30d' })
            const userData  = {
                token,
                username: foundUser.username,
                email: foundUser.email,
            };

            if(foundUser.profileImageUrl) {
                userData.profileImageUrl = foundUser.profileImageUrl;
            }

            if(foundUser.profileHeaderUrl) {
                userData.profileHeaderUrl = foundUser.profileHeaderUrl;
            }
            
            return res.status(200).send(userData);    
        }
    } catch (error) {
        console.error("Feil ved innlogging: ", error);
        return res.status(400).send("Innlogging feilet.")
    }
})

router.get("/profile", authenticateToken, async (req, res) => {

    const foundUser = await User.findById(req.userId);
    console.log(foundUser);
    const userData = {
        username: foundUser.username,
        email: foundUser.email,
    }

    if(foundUser.profileImageUrl) {
        userData.profileImageUrl = foundUser.profileImageUrl; 
    }

    if(foundUser.profileHeaderUrl) {
        userData.profileHeaderUrl = foundUser.profileHeaderUrl;
    }

    return res.status(200).send(userData);
})

router.get("/authtoken", authenticateToken, async (req, res) => {
    const userId = req.userId
    const foundUser = await User.findById(userId);
    const userData = {
        username: foundUser.username,
        email: foundUser.email,
        token: req.token,
    }

    if (foundUser.profileImageUrl) {
        userData.profileImageUrl = foundUser.profileImageUrl;
    }

    if (foundUser.profileHeaderUrl) {
        userData.profileHeaderUrl = foundUser.profileHeaderUrl;
    }

    return res.status(200).send(userData);
})

router.put("/edit", authenticateToken, async (req, res) => {
    const { error } = validateUserEdit(req.body);

    if (error) {
        console.log("Feil i validering");
        return res.status(501).send(error);
    }

    const { userId } = req;
    const { username, email } = req.body;
    const foundUser = await User.findById(userId);
    const usernameUpdated = foundUser.username !== username;
    const emailUpdated = foundUser.email !== email;
    const existingUsername = await User.findOne({ username: username });
    const existingEmail = await User.findOne({ email: email });

    if (usernameUpdated && existingUsername) {
        return res.status(409).send("Brukernavn er opptatt.");
    }

    if (emailUpdated && existingEmail) {
        return res.status(409).send("Eposten er i bruk.");
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(userId, {
            username: username,
            email: email,
        }, { new: true });

        res.status(200).send(updatedUser);

    } catch (error) {
        res.status(401).send("Error updating user in mongoose...");
    }

})


router.delete("/delete", authenticateToken, async (req, res) => {
    try {
        console.log(req.userId)
        const { userId } = req
        const deletedUser = await User.findByIdAndDelete({ _id: userId });
    
        if(!deletedUser) {
            console.log("NOT FOUND")
            return res.status(404).send({ message: "User not found" });
        }
    
        if(deletedUser) {
            console.log("Deleted user found");
            return res.status(200).send({ message: "User found and deleted", username: deletedUser.username });
        }

    } catch(error) {
        return res.status(500).send({ message: "Internal server error i try delete try blocken", error});
    }
})

module.exports = router;
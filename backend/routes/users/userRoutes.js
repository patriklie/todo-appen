const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const validateUser = require('../../utils/validateUser');

router.post("/register", (req, res) => {
    res.send("REGISTER USER");
});

module.exports = router;

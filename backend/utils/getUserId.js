const jwt = require('jsonwebtoken');

const getUserId = (req, res, next) => {
    
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "No Token found." }); 
    }

    try {
        const verifiedToken = jwt.verify(token, process.env.SECRET_KEY);
        req.userId = verifiedToken.userId;
        next();

    } catch (error) {
        return res.status(403).json({ message: "Non valid Token." })
    }
}

module.exports = getUserId;
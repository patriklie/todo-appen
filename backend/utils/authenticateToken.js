const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "No Token found." }); 
    }
    console.log("Dette er token før verify inni AUTH: ", token);
    try {
        const verifiedToken = jwt.verify(token, process.env.SECRET_KEY);
        req.userId = verifiedToken.userId;
        req.token = verifiedToken;
        console.log("Dette er VERIFIED TOKEN", verifiedToken);
        next();

    } catch (error) {
        return res.status(403).json({ message: "Non valid Token" })
    }
}

module.exports = authenticateToken;
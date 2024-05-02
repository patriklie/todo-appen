const jwt = require('jsonwebtoken');

const expiredTokenCheck = (token) => {
       
    const expiresIn = token.exp - Math.floor(Date.now() / 1000);
    console.log("Token expires in: ", expiresIn)
    return expiresIn;
}
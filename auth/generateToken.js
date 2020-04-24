const secrets = require('../api/secrets.js');
const jwt = require('jsonwebtoken');

module.exports = {
    generateToken
}

function generateToken(user){
    const payload = {
        userId: user.id, //if there are issues check out this line not sure if defined in migration
        username: user.username
    };

    const secret = secrets.jwSecret;

    const options = {
        expiresIn: "30s"
    }

    return jwt.sign(payload, secret, options)
} 
/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

const jwt = require('jsonwebtoken');
const secrets = require('../api/secrets');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  const secrets = secrets.jwSecret
  jwt.verify(token, secret, (error, decodedToken) => {
    if (error){
      console.log(error)
      res.status(401).json({ you: 'shall not pass!' })
    } else {
      req.decodedToken = decodedToken
      next()
    }
  })
}
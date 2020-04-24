const router = require('express').Router();
const bcrypt = require('bcryptjs');
const generate = require('./generateToken');
const Users = require('./auth-model');


router.post('/register', (req, res) => {
  // implement registration
  let user = req.body;
  const rounds = process.env.HASH_ROUNDS || 8;
  const hash = bcrypt.hashSync(user.password, rounds);

  user.password = hash;

  Users.add(user)
    .then(saved => {
      const token = generate.generateToken(user)
      res.status(201).json({saved, token, message: "User Created"})
    })
    .catch(error => {
      res.status(500).json(error);
    })
});

router.post('/login', (req, res) => {
  // implement login
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if(user && bcrypt.compareSync(password, user.password)) {
        const token = generate.generateToken(user)
        res.status(200).json({
          message: `welcome ${user.username}`,
          token
        })
      } else {
        res.status(401).json({ message: 'Invalid Credentials' })
      }
    })
    .catch(error => {
      console.log(error)
      res.status(500).json(error);
    })
});

module.exports = router;


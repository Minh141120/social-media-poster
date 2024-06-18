const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
// const axios = require('axios')
const axios = require('axios')


const login = async (req, res) => {
  const { username, password } = req.body;
  // const user2 = await User.findOne({ username });
  // console.log("user2 from /api/auth", user2)
  const user = await axios.get(`http://userservice:3009/api/users/username/${username}`).then(res => res.data)
  console.log("user from /api/user",user)
  const passwordCorrect = user === null ? false : await bcrypt.compare(password, user.passwordHash);
  
  if (!(user && passwordCorrect)) {
    return res.status(401).json({ error: 'invalid username or password' });
  }

  const apikeys = ["0ANT0VV-ERJMS1N-PAVWMVJ-NG9G29Q", "EE3QDJT-MPAM0WA-Q8PCV90-WQRGZ37"];
  const apiKey = user.name === "nguyen" ? apikeys[1] : apikeys[0];

  const userForToken = {
    username: user.username,
    id: user._id
  };

  const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: '1h' });

  res.status(200).send({ token, username: user.username, name: user.name, id: user._id, apikey: apiKey });
}

const register = async (req, res) => {
  const { username, name, password } = req.body;
  const setRounds = 10;
  const passwordHash = await bcrypt.hash(password, setRounds);

  const user = new User({
    username,
    name,
    passwordHash
  });

  const savedUser = await user.save();
  res.status(201).json(savedUser);
};


module.exports = { login, register };

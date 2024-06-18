const bcrypt = require('bcrypt');
const User = require('../models/userModel');

const getUsers = async (req, res) => {
  const users = await User.find({});
  res.json(users);
};

const getUserById = async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
}

const getUserByUsername = async (req, res) => {
  const user = await User.findOne({username: req.params.username})
  res.json(user.toJSONFull())
}

const createUser = async (req, res) => {
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

module.exports = { getUsers, getUserById, createUser , getUserByUsername};

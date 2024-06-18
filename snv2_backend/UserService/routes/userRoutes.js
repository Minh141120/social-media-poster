const express = require('express');
const { getUsers, getUserById, createUser, getUserByUsername } = require('../controllers/userController');

const userRouter = express.Router();

userRouter.get('/', getUsers);
userRouter.get('/:id', getUserById);
userRouter.post('/', createUser);
userRouter.get('/username/:username', getUserByUsername)

module.exports = userRouter;

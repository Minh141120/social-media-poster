const express = require('express');
const { uploadPosts, testServiceConnnection } = require('../controllers/socialController');

const socialRouter = express.Router();

socialRouter.post('/upload', uploadPosts);
socialRouter.get('/test', testServiceConnnection)

module.exports = socialRouter;

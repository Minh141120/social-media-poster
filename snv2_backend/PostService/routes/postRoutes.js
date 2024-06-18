const express = require('express');
const { getPosts, getPostById, createPost, editPost, deletePost } = require('../controllers/postController');

const postRouter = express.Router();

postRouter.get('/', getPosts);
postRouter.get('/:id', getPostById);
postRouter.post('/', createPost);
postRouter.put('/:id',editPost)
postRouter.delete('/:id',deletePost)

module.exports = postRouter;

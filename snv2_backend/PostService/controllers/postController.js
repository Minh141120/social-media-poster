const Post = require('../models/postModel');

const getPosts = async (req, res) => {
  const posts = await Post.find({});
  res.json(posts);
};

const getPostById = async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.json(post);
};

const createPost = async (req, res) => {
  const { title, content } = req.body;
  const post = new Post({ title, content });
  const savedPost = await post.save();
  res.status(201).json(savedPost);
};

const editPost = async (req, res) => {
  const { id } = req.params;
    const { title, content } = req.body;
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    post.title = title || post.title;
    post.content = content || post.content;

    const updatedPost = await post.save();
    res.json(updatedPost);
}

const deletePost = async (req, res) => {
  const { id } = req.params;
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    await Post.deleteOne({_id: id});
    res.json({ message: 'Post removed' });
}



module.exports = { getPosts, getPostById, createPost, editPost, deletePost };
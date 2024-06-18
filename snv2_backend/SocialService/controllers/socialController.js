const SocialPost = require("social-post-api");
const Post = require('../models/postModel');
const axios = require('axios')

const getPostData = (description, title, platforms) => {
  return {
    post: description,
    shorten_links: true,
    title: title,
    platforms: platforms,
    redditOptions: {
      title: title,
      subreddit: "test"
    }
  };
};

const uploadPosts = async (req, res) => { 
  const { selectedPlatforms, selectedPosts2, selectedUser, apikey } = req.body;
  const results = [];
  const social = new SocialPost(apikey);
  // console.log("list post",selectedPosts2)
  const processedPosts = selectedPosts2.map(post => {
    const [title, ...descriptionParts] = post.content.split(' - ');
    const description = descriptionParts.join(' - ');
    return { id: post.id, title: title.trim(), description: description.trim() };
  });
  // console.log(processedPosts)
  for (let i = 0; i < processedPosts.length; i++) {
    const post = processedPosts[i];
    const content = getPostData(post.description, post.title, selectedPlatforms);
    try {
      const json = await social.post(content);
      console.log(json)
      results.push({ ...json, status: 'success' });
    } catch (error) {
      console.error(error);
      results.push({ error: true, message: error.message, status: 'error' });
    }
  }
  res.json(results);
}

const testServiceConnnection = async (req, res) =>{
  const posts = await axios.get('http://postservice:3002/api/posts').then(res => res.data)
  res.json(posts)
  // console.log(posts)
}


module.exports = { uploadPosts , testServiceConnnection};

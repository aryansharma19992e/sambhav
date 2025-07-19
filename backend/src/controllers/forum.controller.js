const Forum = require('../models/forum');
const BaseController = require('./base.controller');

class ForumController extends BaseController {
  constructor() {
    super();
  }

  async createPost(req, res) {
    try {
      const { title, content } = req.body;
      const post = new Forum({ title, content, author: req.user.id });
      await post.save();
      this.logInfo('Forum post created', { postId: post._id });
      res.status(201).json(post);
    } catch (err) {
      this.logError('Error creating post', { error: err.message });
      res.status(500).json({ message: 'Error creating post', error: err.message });
    }
  }

  async getPosts(req, res) {
    try {
      const posts = await Forum.find().populate('author', 'firstName lastName role');
      this.logInfo('Forum posts fetched', { count: posts.length });
      res.json(posts);
    } catch (err) {
      this.logError('Error fetching posts', { error: err.message });
      res.status(500).json({ message: 'Error fetching posts', error: err.message });
    }
  }
}

module.exports = ForumController; 
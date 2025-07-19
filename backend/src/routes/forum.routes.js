const express = require('express');
const router = express.Router();
const ForumController = require('../controllers/forum.controller');
const forumController = new ForumController();
const auth = require('../middlewares/auth.middleware');

router.post('/', auth, forumController.createPost.bind(forumController));
router.get('/', forumController.getPosts.bind(forumController));

module.exports = router; 
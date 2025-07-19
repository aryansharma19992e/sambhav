const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth.controller');
const authController = new AuthController();

// Auth routes
router.post('/signup', authController.signup.bind(authController));
router.post('/login', authController.login.bind(authController));

module.exports = router; 
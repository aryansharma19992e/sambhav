const User = require('../models/user');
const jwt = require('jsonwebtoken');
const BaseController = require('./base.controller');

class AuthController extends BaseController {
  constructor() {
    super();
  }

  // Generate JWT Token
  generateToken(user) {
    return jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );
  }

  async signup(req, res) {
    try {
      const { firstName, lastName, email, password, role } = req.body;
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        this.logInfo('Signup attempt with existing email', { email });
        return res.status(400).json({ message: 'User already exists with this email' });
      }
      const user = new User({ firstName, lastName, email, password, role });
      await user.save();
      const token = this.generateToken(user);
      this.logInfo('User signed up successfully', { userId: user._id });
      res.status(201).json({
        message: 'User created successfully',
        token,
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role
        }
      });
    } catch (error) {
      this.logError('Signup error', { error: error.message });
      res.status(500).json({ message: 'Error creating user', error: error.message });
    }
  }

  async login(req, res) {
    try {
      const { email, password, role } = req.body;
      const user = await User.findOne({ email });
      if (!user || user.role !== role) {
        this.logInfo('Login failed: invalid credentials or role mismatch', { email, role });
        return res.status(401).json({ message: 'Invalid credentials or role mismatch' });
      }
      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        this.logInfo('Login failed: invalid credentials', { email });
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      const token = this.generateToken(user);
      this.logInfo('User logged in successfully', { userId: user._id });
      res.json({
        message: 'Login successful',
        token,
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role
        }
      });
    } catch (error) {
      this.logError('Login error', { error: error.message });
      res.status(500).json({ message: 'Error during login', error: error.message });
    }
  }
}

module.exports = AuthController; 
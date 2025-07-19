const { StudentProfile } = require('../models');
const BaseController = require('./base.controller');

class StudentProfileController extends BaseController {
  constructor() {
    super();
  }

  async createOrUpdateProfile(req, res) {
    try {
      const userId = req.body.user;
      const profileData = {
        age: req.body.age,
        gender: req.body.gender,
        qualifications: req.body.qualifications,
        location: req.body.location,
        pincode: req.body.pincode,
        income: req.body.income,
        interest: req.body.interest,
        phone: req.body.phone,
        status: 'waiting_for_counsellor',
        user: userId,
      };
      const profile = await StudentProfile.findOneAndUpdate(
        { user: userId },
        profileData,
        { new: true, upsert: true, setDefaultsOnInsert: true }
      );
      this.logInfo('Student profile created/updated', { userId });
      res.status(200).json({ success: true, profile });
    } catch (err) {
      this.logError('Error creating/updating student profile', { error: err.message });
      res.status(500).json({ success: false, message: err.message });
    }
  }

  async getProfileStatus(req, res) {
    try {
      const userId = req.params.userId;
      const profile = await StudentProfile.findOne({ user: userId });
      if (!profile) {
        this.logInfo('Profile not found', { userId });
        return res.status(404).json({ success: false, message: 'Profile not found' });
      }
      this.logInfo('Profile status fetched', { userId, status: profile.status });
      res.status(200).json({ success: true, status: profile.status });
    } catch (err) {
      this.logError('Error fetching profile status', { error: err.message });
      res.status(500).json({ success: false, message: err.message });
    }
  }

  async getAllProfiles(req, res) {
    try {
      const profiles = await StudentProfile.find().populate('user', 'firstName lastName email').select('+phone');
      this.logInfo('All student profiles fetched', { count: profiles.length });
      res.status(200).json({ success: true, profiles });
    } catch (err) {
      this.logError('Error fetching all profiles', { error: err.message });
      res.status(500).json({ success: false, message: err.message });
    }
  }

  async updateProfileStatus(req, res) {
    try {
      const { userId } = req.params;
      const { status } = req.body;
      if (!['waiting_for_counsellor', 'in_progress', 'completed'].includes(status)) {
        this.logInfo('Invalid profile status update', { userId, status });
        return res.status(400).json({ success: false, message: 'Invalid status' });
      }
      const profile = await StudentProfile.findOneAndUpdate(
        { user: userId },
        { status },
        { new: true }
      );
      if (!profile) {
        this.logInfo('Profile not found for status update', { userId });
        return res.status(404).json({ success: false, message: 'Profile not found' });
      }
      this.logInfo('Profile status updated', { userId, status });
      res.status(200).json({ success: true, profile });
    } catch (err) {
      this.logError('Error updating profile status', { error: err.message });
      res.status(500).json({ success: false, message: err.message });
    }
  }

  getStudentDashboardMock(req, res) {
    this.logInfo('Mock student dashboard data returned');
    res.json({
      success: true,
      data: {
        progress: 75,
        attendance: 92,
        assignments: { completed: 8, total: 10 },
        courses: [
          { id: 1, name: 'Web Development', status: 'active' },
          { id: 2, name: 'Data Science', status: 'completed' },
        ],
        feedback: [
          { id: 1, text: 'Great progress!', from: 'Instructor' },
        ],
        profile: {
          name: 'John Doe',
          role: 'student',
          email: 'john@example.com',
          phone: '9876543210',
        },
      },
    });
  }
}

module.exports = StudentProfileController; 
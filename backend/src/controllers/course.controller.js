const { Course, AssignmentProgress, User } = require('../models');
const BaseController = require('./base.controller');

class CourseController extends BaseController {
  constructor() {
    super();
  }

  async createCourse(req, res) {
    try {
      const { user, courseName, instructor } = req.body;
      if (!user || !courseName || !instructor) {
        this.logInfo('Invalid course creation data', { user, courseName, instructor });
        return res.status(400).json({ success: false, message: 'user, courseName, and instructor are required' });
      }
      const course = new Course({ user, courseName, instructor });
      await course.save();
      this.logInfo('Course created', { courseId: course._id });
      res.status(201).json({ success: true, course });
    } catch (err) {
      this.logError('Error creating course', { error: err.message });
      res.status(500).json({ success: false, message: err.message });
    }
  }

  async getStudentDashboardData(req, res) {
    try {
      const userId = req.query.user;
      if (!userId) {
        this.logInfo('Student dashboard data fetch failed: user query param required');
        return res.status(400).json({ success: false, message: 'user query param required' });
      }
      const courses = await Course.find({ user: userId }).populate('instructor', 'firstName lastName');
      const progress = await AssignmentProgress.findOne({ user: userId });
      this.logInfo('Student dashboard data fetched', { userId, courseCount: courses.length });
      res.json({
        success: true,
        data: {
          courses: courses.map(c => ({
            courseName: c.courseName,
            instructorName: c.instructor ? `${c.instructor.firstName} ${c.instructor.lastName}` : '',
          })),
          assignmentsCompleted: progress ? progress.assignmentsCompleted : 0,
        },
      });
    } catch (err) {
      this.logError('Error fetching student dashboard data', { error: err.message });
      res.status(500).json({ success: false, message: err.message });
    }
  }
}

module.exports = CourseController; 
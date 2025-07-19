const AuthController = require('./auth.controller');
const authController = new AuthController();
const AssessmentController = require('./assessment.controller');
const assessmentController = new AssessmentController();
const ForumController = require('./forum.controller');
const forumController = new ForumController();
const AssignmentProgressController = require('./assignmentProgress.controller');
const assignmentProgressController = new AssignmentProgressController();
const CourseController = require('./course.controller');
const courseController = new CourseController();
const StudentProfileController = require('./studentProfile.controller');
const studentProfileController = new StudentProfileController();
const AttendanceController = require('./attendance.controller');
const attendanceController = new AttendanceController();

module.exports = {
  authController,
  assessmentController,
  forumController,
  assignmentProgressController,
  courseController,
  studentProfileController,
  attendanceController,
}; 
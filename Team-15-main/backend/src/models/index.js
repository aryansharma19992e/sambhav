// Import individual models here
// Example: const User = require('./User');
const User = require('./user');
const Assessment = require('./assessment');
const Forum = require('./forum');
const StudentProfile = require('./studentProfile');
const AssignmentProgress = require('./assignmentProgress');
const Course = require('./course');
const Attendance = require('./attendance');

// Export models
module.exports = {
  User,
  Assessment,
  Forum,
  StudentProfile,
  AssignmentProgress,
  Course,
  Attendance,
}; 
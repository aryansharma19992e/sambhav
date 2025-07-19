const express = require('express');
const router = express.Router();
const StudentProfileController = require('../controllers/studentProfile.controller');
const studentProfileController = new StudentProfileController();
const AssignmentProgressController = require('../controllers/assignmentProgress.controller');
const assignmentProgressController = new AssignmentProgressController();
const CourseController = require('../controllers/course.controller');
const courseController = new CourseController();
const { attendanceController } = require('../controllers');

router.use('/auth', require('./auth.routes'));
router.use('/forum', require('./forum.routes'));
router.use('/assessment', require('./assessment.routes'));
router.post('/student-profile', studentProfileController.createOrUpdateProfile.bind(studentProfileController));
router.get('/student-profile/:userId/status', studentProfileController.getProfileStatus.bind(studentProfileController));
router.get('/student-profile', studentProfileController.getAllProfiles.bind(studentProfileController));
router.patch('/student-profile/:userId/status', studentProfileController.updateProfileStatus.bind(studentProfileController));
router.get('/student-dashboard-mock', studentProfileController.getStudentDashboardMock.bind(studentProfileController));
router.post('/assignment-progress', assignmentProgressController.createOrUpdateProgress.bind(assignmentProgressController));
router.post('/course', courseController.createCourse.bind(courseController));
router.get('/student-dashboard-data', courseController.getStudentDashboardData.bind(courseController));
router.post('/attendance', attendanceController.recordAttendance.bind(attendanceController));

module.exports = router; 
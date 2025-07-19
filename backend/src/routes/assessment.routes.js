const express = require('express');
const router = express.Router();
const AssessmentController = require('../controllers/assessment.controller');
const assessmentController = new AssessmentController();
const auth = require('../middlewares/auth.middleware');

router.post('/', auth, assessmentController.createAssessment.bind(assessmentController));
router.get('/', assessmentController.getAssessments.bind(assessmentController));

module.exports = router; 
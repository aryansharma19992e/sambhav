const Assessment = require('../models/assessment');
const BaseController = require('./base.controller');

class AssessmentController extends BaseController {
  constructor() {
    super();
  }

  async createAssessment(req, res) {
    try {
      const { title, description } = req.body;
      const assessment = new Assessment({ title, description, createdBy: req.user.id });
      await assessment.save();
      this.logInfo('Assessment created', { assessmentId: assessment._id });
      res.status(201).json(assessment);
    } catch (err) {
      this.logError('Error creating assessment', { error: err.message });
      res.status(500).json({ message: 'Error creating assessment', error: err.message });
    }
  }

  async getAssessments(req, res) {
    try {
      const assessments = await Assessment.find().populate('createdBy', 'firstName lastName role');
      this.logInfo('Assessments fetched', { count: assessments.length });
      res.json(assessments);
    } catch (err) {
      this.logError('Error fetching assessments', { error: err.message });
      res.status(500).json({ message: 'Error fetching assessments', error: err.message });
    }
  }
}

module.exports = AssessmentController; 
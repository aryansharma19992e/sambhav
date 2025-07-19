const { AssignmentProgress } = require('../models');
const BaseController = require('./base.controller');

class AssignmentProgressController extends BaseController {
  constructor() {
    super();
  }

  async createOrUpdateProgress(req, res) {
    try {
      const userId = req.body.user;
      const assignmentsCompleted = req.body.assignmentsCompleted;
      if (!userId || typeof assignmentsCompleted !== 'number') {
        this.logInfo('Invalid assignment progress data', { userId, assignmentsCompleted });
        return res.status(400).json({ success: false, message: 'user and assignmentsCompleted are required' });
      }
      const progress = await AssignmentProgress.findOneAndUpdate(
        { user: userId },
        { assignmentsCompleted, updatedAt: new Date() },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      );
      this.logInfo('Assignment progress updated', { userId, assignmentsCompleted });
      res.status(200).json({ success: true, progress });
    } catch (err) {
      this.logError('Error updating assignment progress', { error: err.message });
      res.status(500).json({ success: false, message: err.message });
    }
  }
}

module.exports = AssignmentProgressController; 
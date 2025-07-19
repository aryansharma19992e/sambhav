const { Attendance } = require('../models');
const BaseController = require('./base.controller');

class AttendanceController extends BaseController {
  constructor() {
    super();
  }

  async recordAttendance(req, res) {
    try {
      const { sessionId, photoFilename, timestamp, location, metadata, userId } = req.body;
      if (!userId) {
        return res.status(400).json({ success: false, message: 'userId is required' });
      }
      // Assume photo and metadata files are already saved and their paths are provided
      const photoPath = `/path/to/photos/${photoFilename}`;
      const metadataPath = `/path/to/metadata/${sessionId}.json`;
      const attendanceRecord = await Attendance.create({
        sessionId,
        photoPath,
        metadataPath,
        location,
        timestamp,
        user: userId,
      });
      this.logInfo(`Attendance recorded for session ${sessionId}:`, {
        userId,
        photoPath,
        metadataPath,
        location: attendanceRecord.location,
        timestamp: attendanceRecord.timestamp,
      });
      res.status(201).json({ success: true, attendance: attendanceRecord });
    } catch (err) {
      this.logError('Error recording attendance', { error: err.message });
      res.status(500).json({ success: false, message: err.message });
    }
  }
}

module.exports = AttendanceController; 
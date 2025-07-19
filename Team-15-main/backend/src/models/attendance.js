const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  sessionId: { type: String, required: true },
  photoPath: { type: String, required: true },
  metadataPath: { type: String, required: true },
  location: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  timestamp: { type: Date, required: true },
});

module.exports = mongoose.model('Attendance', attendanceSchema); 
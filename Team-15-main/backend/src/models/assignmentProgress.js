const mongoose = require('mongoose');

const assignmentProgressSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  assignmentsCompleted: { type: Number, required: true },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('AssignmentProgress', assignmentProgressSchema); 
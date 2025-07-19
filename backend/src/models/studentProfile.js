const mongoose = require('mongoose');

const studentProfileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  qualifications: { type: String, required: true },
  location: { type: String, required: true },
  pincode: { type: String, required: true },
  income: { type: Number, required: true },
  interest: { type: String, required: true },
  phone: { type: String, required: true },
  status: { type: String, enum: ['waiting_for_counsellor', 'in_progress', 'completed'], default: 'waiting_for_counsellor' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('StudentProfile', studentProfileSchema); 
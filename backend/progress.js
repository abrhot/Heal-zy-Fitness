const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  weight: { type: Number },
  activity: { type: String }
}, {
  timestamps: true
});

const Progress = mongoose.model('Progress', progressSchema);
module.exports = Progress;

const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  type: String,
  duration: Number, // in minutes
  caloriesBurned: Number
});

const progressLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  weight: {
    type: Number,
    required: true
  },
  activitiesDone: [activitySchema],
  notes: String
});

module.exports = mongoose.model('ProgressLog', progressLogSchema);

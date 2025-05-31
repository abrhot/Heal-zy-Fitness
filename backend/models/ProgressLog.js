const mongoose = require('mongoose');

const progressLogSchema = new mongoose.Schema({
  user: { // Changed from userId to user to match convention, and added ref
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    default: Date.now,
    required: true
  },
  weight: { // Assuming weight in kg
    type: Number,
    required: [true, 'Weight is required for a progress log entry']
  },
  notes: {
    type: String,
    trim: true
  }
}, {
  timestamps: true // Adds createdAt and updatedAt
});

// Optional: Add an index if you frequently query by user and date
progressLogSchema.index({ user: 1, date: -1 });

const ProgressLog = mongoose.model('ProgressLog', progressLogSchema);

module.exports = ProgressLog;

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  bloodType: {
    type: String,
    required: true,
  },
  currentWeight: {
    type: Number,
    required: true,
  },
  goal: {
    type: String,
    required: true,
    enum: ['Weight Gain', 'Weight Loss', 'Endurance'],
  },
  healthConditions: {
    type: String,
  },
  workoutAvailability: {
    daysPerWeek: {
      type: Number,
      required: true,
    },
    hoursPerDay: {
      type: Number,
      required: true,
    },
  },
  weightHistory: [
    {
      date: {
        type: Date,
        default: Date.now,
      },
      weight: {
        type: Number,
      },
    },
  ],
});

const User = mongoose.model('User', userSchema);

module.exports = User;

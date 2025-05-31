const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  duration: { // Example: "30 mins", "1 hour"
    type: String,
    required: false, // Optional based on how detailed the plan needs to be
  },
  sets: { // Example: 3
    type: Number,
    required: false,
  },
  reps: { // Example: 12
    type: Number,
    required: false,
  },
  notes: { // Additional notes for the activity
    type: String,
    required: false,
  }
}, {_id: false}); // _id is not needed for sub-documents if not queried directly

const dailyPlanSchema = new mongoose.Schema({
  day: { // e.g., "Monday", "Day 1"
    type: String,
    required: true,
  },
  activities: {
    type: [String], // Keeping it simple as per original request "Array of Strings"
    // If more structured activities are needed later, this could be [activitySchema]
    required: true,
  },
  // If activities were to be more structured, it would be:
  // activities: {
  //   type: [activitySchema],
  //   required: true,
  // }
}, {_id: false}); // _id is not needed for sub-documents

const workoutPlanSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true, // Typically, a user has one main workout plan. If multiple, remove unique.
  },
  planName: { // e.g., "My Weight Loss Plan", "Endurance Training Week 1"
    type: String,
    required: false, // Optional name for the plan
    default: 'My Workout Plan',
  },
  goal: { // Copied or linked from User's goal at the time of plan creation
    type: String,
    required: false, // Could be made required if plan must align with a specific goal
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  plan: { // Array of daily plans
    type: [dailyPlanSchema],
    required: true,
  },
  // Optional: General notes for the entire plan
  notes: {
    type: String,
    required: false,
  }
}, { timestamps: true }); // Adds createdAt and updatedAt timestamps

const WorkoutPlan = mongoose.model('WorkoutPlan', workoutPlanSchema);

module.exports = WorkoutPlan;

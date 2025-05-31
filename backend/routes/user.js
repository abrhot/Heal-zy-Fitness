const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');

// GET /api/user/profile
// @desc Get user profile
// @access Private
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    // req.user is set by authMiddleware
    if (!req.user || !req.user.id) {
      // This case should ideally be caught by authMiddleware if token is invalid or malformed
      return res.status(401).json({ msg: 'User not authenticated properly' });
    }

    const user = await User.findById(req.user.id).select('-password');

    if (!user) {
      // This case means the user ID from a valid token does not exist in DB, which is unusual
      return res.status(404).json({ msg: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;

// PUT /api/user/profile
// @desc Update user profile
// @access Private
router.put('/profile', authMiddleware, async (req, res) => {
  const {
    fullName,
    bloodType,
    currentWeight,
    goal,
    healthConditions,
    workoutAvailability, // Expecting an object like { daysPerWeek, hoursPerDay }
  } = req.body;

  // Build fields to update
  const updatedFields = {};
  if (fullName) updatedFields.fullName = fullName;
  if (bloodType) updatedFields.bloodType = bloodType;
  if (currentWeight) updatedFields.currentWeight = Number(currentWeight);
  if (goal) updatedFields.goal = goal;
  if (healthConditions !== undefined) updatedFields.healthConditions = healthConditions; // Allow empty string

  // Handle nested workoutAvailability
  if (workoutAvailability) {
    updatedFields.workoutAvailability = {};
    if (workoutAvailability.daysPerWeek !== undefined) {
      updatedFields.workoutAvailability.daysPerWeek = Number(workoutAvailability.daysPerWeek);
    }
    if (workoutAvailability.hoursPerDay !== undefined) {
      updatedFields.workoutAvailability.hoursPerDay = Number(workoutAvailability.hoursPerDay);
    }
    // If workoutAvailability is provided but one of its sub-fields is missing,
    // Mongoose will not update that sub-field if we don't explicitly set it.
    // To ensure partial updates to workoutAvailability work as expected,
    // we might need to fetch the existing user's workoutAvailability
    // and merge if only one sub-field is provided.
    // However, for simplicity here, we'll assume the client sends both if workoutAvailability is intended for update,
    // or Mongoose will update only the provided sub-fields within the nested object.
    // If workoutAvailability in req.body is an empty object {}, it might clear it.
    // If it's {daysPerWeek: 5}, it will set daysPerWeek and leave hoursPerDay as is (Mongoose default behavior for $set on nested).
  }


  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ msg: 'User not authenticated properly' });
    }

    let user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Update user
    // Using $set ensures only provided fields are updated.
    // For nested objects like workoutAvailability, $set will update specified sub-fields.
    user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updatedFields },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
        // Should not happen if findById worked before, but as a safeguard
        return res.status(404).json({ msg: 'User not found after update attempt' });
    }

    res.json(user);
  } catch (err) {
    console.error(err.message);
    if (err.name === 'ValidationError') {
      return res.status(400).json({ msg: err.message });
    }
    res.status(500).send('Server Error');
  }
});

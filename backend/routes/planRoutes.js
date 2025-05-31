const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const User = require('../models/User');
const workoutService = require('../services/workoutService');
const nutritionService = require('../services/nutritionService');

// @route   GET api/plan/workout
// @desc    Get a generated workout plan for the logged-in user
// @access  Private
router.get('/workout', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    const workoutPlan = workoutService.generatePlan(user);
    res.json(workoutPlan);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/plan/nutrition
// @desc    Get a generated nutrition plan for the logged-in user
// @access  Private
router.get('/nutrition', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    const nutritionPlan = nutritionService.generatePlan(user);
    res.json(nutritionPlan);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;

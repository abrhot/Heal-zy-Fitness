const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const User = require('../models/User');
const { check, validationResult } = require('express-validator');

// @route   GET api/user/profile
// @desc    Get current user's profile
// @access  Private
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    // req.user.id is set by the authMiddleware
    const user = await User.findById(req.user.id).select('-password'); // Exclude password from result
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/user/profile
// @desc    Create or update user profile (excluding password)
// @access  Private
router.post(
  '/profile',
  [
    authMiddleware,
    // Add any specific validations for profile fields here if needed
    // For example:
    check('fullName', 'Full name is required').optional().not().isEmpty(),
    check('weight', 'Weight must be a positive number').optional().isFloat({ gt: 0 }),
    check('height', 'Height must be a positive number').optional().isFloat({ gt: 0 }),
    // Add checks for bloodType, healthConditions, goals, availability as they become more defined
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      fullName,
      bloodType,
      weight,
      height,
      healthConditions,
      goals,
      availability
      // Note: email and password are not updated here. Email is unique identifier, password has separate flow.
    } = req.body;

    // Build profile object
    const profileFields = {};
    if (fullName) profileFields.fullName = fullName;
    if (bloodType) profileFields.bloodType = bloodType;
    if (weight) profileFields.weight = weight;
    if (height) profileFields.height = height;
    if (healthConditions) profileFields.healthConditions = healthConditions;
    if (goals) profileFields.goals = goals;
    if (availability) profileFields.availability = availability;

    try {
      let user = await User.findById(req.user.id);

      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }

      // Update user
      user = await User.findByIdAndUpdate(
        req.user.id,
        { $set: profileFields },
        { new: true, runValidators: true } // new: true returns the modified document
      ).select('-password');

      res.json(user);
    } catch (err) {
      console.error(err.message);
      // Handle potential validation errors from the model if runValidators is true
      if (err.name === 'ValidationError') {
        return res.status(400).json({ errors: [{ msg: err.message }] });
      }
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;

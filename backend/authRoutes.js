const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      age,
      gender,
      weight,
      height,
      bloodType,
      goal,
      activityLevel
    } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Create a new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
      age,
      gender,
      weight,
      height,
      bloodType,
      goal,
      activityLevel
    });

    // Save the new user to the database
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ error: 'Server error during registration' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    // Compare passwords using the instance method
    const isMatch = await user.isValidPassword(password);
    console.log('Password match result:', isMatch);

    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid password' });
    }

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Server error during login' });
  }
});

module.exports = router;

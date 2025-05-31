const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// POST /api/auth/register
router.post('/register', async (req, res) => {
  const {
    fullName,
    email,
    password,
    bloodType,
    currentWeight,
    goal,
    healthConditions,
    workoutAvailability,
  } = req.body;

  // Basic validation
  if (
    !fullName ||
    !email ||
    !password ||
    !bloodType ||
    !currentWeight ||
    !goal ||
    !workoutAvailability
  ) {
    return res.status(400).json({ msg: 'Please enter all required fields' });
  }

  if (
    typeof workoutAvailability.daysPerWeek !== 'number' ||
    typeof workoutAvailability.hoursPerDay !== 'number'
  ) {
    return res
      .status(400)
      .json({ msg: 'Invalid workoutAvailability format' });
  }

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Create new user instance
    user = new User({
      fullName,
      email,
      password,
      bloodType,
      currentWeight,
      goal,
      healthConditions,
      workoutAvailability,
    });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save user to database
    await user.save();

    // Create JWT payload
    const payload = {
      user: {
        id: user.id,
      },
    };

    // Sign JWT token
    // IMPORTANT: Replace 'yourSecretKey' with an actual secret key, preferably from environment variables
    jwt.sign(
      payload,
      process.env.JWT_SECRET || 'yourSecretKey',
      { expiresIn: 3600 }, // Expires in 1 hour
      (err, token) => {
        if (err) throw err;
        res.status(201).json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Basic validation
  if (!email || !password) {
    return res.status(400).json({ msg: 'Please enter all required fields' });
  }

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Create JWT payload
    const payload = {
      user: {
        id: user.id,
      },
    };

    // Sign JWT token
    // IMPORTANT: Replace 'yourSecretKey' with an actual secret key, preferably from environment variables
    jwt.sign(
      payload,
      process.env.JWT_SECRET || 'yourSecretKey',
      { expiresIn: 3600 }, // Expires in 1 hour
      (err, token) => {
        if (err) throw err;
        res.json({ token }); // 200 OK is default
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

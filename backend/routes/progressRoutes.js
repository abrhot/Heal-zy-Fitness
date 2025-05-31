const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const ProgressLog = require('../models/ProgressLog');
const User = require('../models/User'); // To ensure user exists
const { check, validationResult } = require('express-validator');

// @route   POST api/progress/log
// @desc    Record a new progress log (e.g., weekly weight)
// @access  Private
router.post(
  '/log',
  [
    authMiddleware,
    check('weight', 'Weight is required and must be a number').isNumeric().not().isEmpty(),
    check('date', 'Date is required and must be a valid date').optional().isISO8601().toDate(), // Optional: if not provided, defaults in schema
    check('notes', 'Notes must be a string').optional().isString()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { weight, notes } = req.body;
    // If date is provided in body, use it, otherwise schema default will apply
    const date = req.body.date ? new Date(req.body.date) : undefined;


    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ msg: 'User not found, cannot log progress.' });
      }

      const newLog = new ProgressLog({
        user: req.user.id,
        weight,
        date, // Pass undefined if not provided, so default kicks in
        notes
      });

      const log = await newLog.save();
      res.json(log);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   GET api/progress/log
// @desc    Get all progress logs for the logged-in user, sorted by date descending
// @access  Private
router.get('/log', authMiddleware, async (req, res) => {
  try {
    const logs = await ProgressLog.find({ user: req.user.id }).sort({ date: -1 });
    if (!logs) {
      // find returns [] if no documents, so this check might not be strictly needed
      // unless you want to differentiate between "no logs" and an error.
      return res.status(404).json({ msg: 'No progress logs found for this user.' });
    }
    res.json(logs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;

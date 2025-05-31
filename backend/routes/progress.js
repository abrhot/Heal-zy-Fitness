const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');

// POST /api/progress/log
// @desc Log new weight for the user
// @access Private
router.post('/log', authMiddleware, async (req, res) => {
  const { weight } = req.body;

  // Validate weight
  if (weight === undefined || weight === null) {
    return res.status(400).json({ msg: 'Weight is required.' });
  }
  if (typeof weight !== 'number' || isNaN(parseFloat(weight))) {
    return res.status(400).json({ msg: 'Weight must be a valid number.' });
  }
  if (parseFloat(weight) <= 0) {
      return res.status(400).json({msg: 'Weight must be a positive number.'});
  }


  try {
    // User ID is available from authMiddleware (req.user.id)
    const newWeightEntry = {
      date: new Date(),
      weight: parseFloat(weight),
    };

    // Find user and add to weightHistory
    // Using findByIdAndUpdate with $push to add to the array
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { $push: { weightHistory: newWeightEntry } },
      { new: true, runValidators: true } // new: true returns the modified document
    ).select('weightHistory email fullName'); // Select specific fields to return, or adjust as needed

    if (!updatedUser) {
      // This should ideally not happen if authMiddleware passed and user.id is valid
      return res.status(404).json({ msg: 'User not found.' });
    }

    // Return success message and the latest entry or the whole history
    res.status(201).json({
        msg: 'Weight logged successfully.',
        latestEntry: updatedUser.weightHistory[updatedUser.weightHistory.length -1], // Send back the last entry
        // weightHistory: updatedUser.weightHistory // Optionally send the whole history
    });

  } catch (err) {
    console.error('Error logging weight:', err.message);
    if (err.name === 'ValidationError') {
      return res.status(400).json({ msg: err.message });
    }
    res.status(500).send('Server Error');
  }
});

// GET /api/progress/history
// @desc Get user's weight history
// @access Private
router.get('/history', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('weightHistory -_id'); // Select only weightHistory
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        // Sort history by date descending (most recent first)
        const sortedHistory = user.weightHistory.sort((a, b) => b.date - a.date);
        res.json(sortedHistory);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;

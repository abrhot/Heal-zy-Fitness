const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const WorkoutPlan = require('../models/WorkoutPlan');
const NutritionPlan = require('../models/NutritionPlan');

// POST /api/plan/workout - Generate/Create a new workout plan
// For now, this is a placeholder. Actual generation logic will be complex.
router.post('/workout', authMiddleware, async (req, res) => {
  // Placeholder: In a real scenario, you'd take user preferences/details from req.body
  // or generate based on the user's profile (req.user.id)
  // For now, we'll just return a 501
  res.status(501).json({ message: 'Workout plan generation/creation not yet implemented.' });
});

// POST /api/plan/nutrition - Generate/Create a new nutrition plan
// Placeholder for now.
router.post('/nutrition', authMiddleware, async (req, res) => {
  res.status(501).json({ message: 'Nutrition plan generation/creation not yet implemented.' });
});

// GET /api/plan/workout/view - View current workout plan
router.get('/workout/view', authMiddleware, async (req, res) => {
  try {
    const workoutPlan = await WorkoutPlan.findOne({ userId: req.user.id });
    if (!workoutPlan) {
      return res.status(404).json({ message: 'No workout plan found for this user.' });
    }
    res.json(workoutPlan);
  } catch (err) {
    console.error('Error fetching workout plan:', err.message);
    res.status(500).send('Server Error');
  }
});

// GET /api/plan/nutrition/view - View current nutrition plan
router.get('/nutrition/view', authMiddleware, async (req, res) => {
  try {
    const nutritionPlan = await NutritionPlan.findOne({ userId: req.user.id });
    if (!nutritionPlan) {
      return res.status(404).json({ message: 'No nutrition plan found for this user.' });
    }
    res.json(nutritionPlan);
  } catch (err) {
    console.error('Error fetching nutrition plan:', err.message);
    res.status(500).send('Server Error');
  }
});

// Placeholder for PUT /api/plan/workout - Update existing workout plan
router.put('/workout', authMiddleware, async (req, res) => {
    res.status(501).json({ message: 'Workout plan update not yet implemented.' });
});

// Placeholder for PUT /api/plan/nutrition - Update existing nutrition plan
router.put('/nutrition', authMiddleware, async (req, res) => {
    res.status(501).json({ message: 'Nutrition plan update not yet implemented.' });
});


module.exports = router;

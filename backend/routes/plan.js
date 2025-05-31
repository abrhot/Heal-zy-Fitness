const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const WorkoutPlan = require('../models/WorkoutPlan');
const NutritionPlan = require('../models/NutritionPlan');

const User = require('../models/User'); // Import User model

// POST /api/plan/workout - Generate/Create a new workout plan
router.post('/workout', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const { goal, workoutAvailability, healthConditions } = user;
    const daysPerWeek = workoutAvailability.daysPerWeek || 3; // Default to 3 if not set
    const hoursPerDay = workoutAvailability.hoursPerDay || 1; // Default to 1 if not set

    const cardioActivities = ['Running', 'Cycling', 'Swimming', 'HIIT Session', 'Brisk Walking', 'Jump Rope'];
    const strengthActivities = ['Full Body Workout', 'Upper Body Strength', 'Lower Body Strength', 'Core Workout'];
    const enduranceActivities = ['Long Distance Run', 'Extended Cycle', 'Brick Workout (Cycle/Run)', 'Long Swim'];
    const restDayActivities = ['Active Recovery (Stretch/Yoga)', 'Complete Rest', 'Light Walk'];

    const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    let generatedPlanData = [];
    let workoutDaysCount = 0;

    for (let i = 0; i < 7; i++) {
      const currentDayName = weekDays[i];
      let dailyActivities = [];

      if (workoutDaysCount < daysPerWeek) {
        let activity1 = '', activity2 = null;
        let duration1 = hoursPerDay >= 1 ? (hoursPerDay >= 1.5 ? "60-90 mins" : "45-60 mins") : "20-30 mins";
        let duration2 = hoursPerDay >= 1.5 ? "30-45 mins" : null;

        // Basic health condition check (example)
        let availableCardio = [...cardioActivities];
        if (healthConditions && healthConditions.toLowerCase().includes("knee pain")) {
          availableCardio = availableCardio.filter(act => act !== 'Running' && act !== 'Jump Rope' && act !== 'HIIT Session');
        }
        if (availableCardio.length === 0) availableCardio.push('Low Impact Cardio (e.g. Elliptical)'); // Fallback

        switch (goal) {
          case 'Weight Loss':
            activity1 = availableCardio[Math.floor(Math.random() * availableCardio.length)];
            if (hoursPerDay >= 1.5 && Math.random() > 0.5) {
                activity2 = strengthActivities[Math.floor(Math.random() * strengthActivities.length)];
            } else if (hoursPerDay < 1 && Math.random() > 0.3) {
                 activity2 = strengthActivities[Math.floor(Math.random() * strengthActivities.length)];
                 duration2 = "15-20 mins";
            }
            break;
          case 'Weight Gain':
            activity1 = strengthActivities[Math.floor(Math.random() * strengthActivities.length)];
             if (hoursPerDay >= 1.5 && Math.random() > 0.5) {
                activity2 = availableCardio[Math.floor(Math.random() * availableCardio.length)];
            } else if (hoursPerDay >= 1 && Math.random() > 0.3) {
                activity2 = availableCardio[Math.floor(Math.random() * availableCardio.length)];
                duration2 = "20-30 mins";
            }
            break;
          case 'Endurance':
            activity1 = enduranceActivities[Math.floor(Math.random() * enduranceActivities.length)];
            duration1 = hoursPerDay >= 1.5 ? "90-120+ mins" : (hoursPerDay >= 1 ? "60-90 mins" : "45-60 mins");
            if (hoursPerDay >= 1.5 && Math.random() > 0.7) {
                activity2 = ['Technique Drills', 'Core Stability'][Math.floor(Math.random()*2)];
                duration2 = "20-30 mins";
            }
            break;
          default:
            activity1 = availableCardio[Math.floor(Math.random() * availableCardio.length)];
            if (hoursPerDay >= 1 && Math.random() > 0.5) {
                 activity2 = strengthActivities[Math.floor(Math.random() * strengthActivities.length)];
            }
        }

        dailyActivities.push(`${activity1} - ${duration1}`);
        if (activity2 && duration2) {
          dailyActivities.push(`${activity2} - ${duration2}`);
        } else if (activity2) {
            dailyActivities.push(`${activity2} - 20-30 mins`); // Fallback duration
        }

        workoutDaysCount++;
      } else {
        dailyActivities.push(restDayActivities[Math.floor(Math.random() * restDayActivities.length)]);
      }
      generatedPlanData.push({ day: currentDayName, activities: dailyActivities });
    }

    const workoutPlan = await WorkoutPlan.findOneAndUpdate(
      { userId: req.user.id },
      {
        plan: generatedPlanData,
        goal: user.goal,
        planName: `${user.fullName}'s ${user.goal} Plan` || `My ${user.goal} Plan`,
        startDate: new Date(), // Set/update start date on new generation
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    res.status(201).json(workoutPlan);

  } catch (err) {
    console.error('Error generating workout plan:', err.message);
    if (err.name === 'ValidationError') {
        return res.status(400).json({ message: err.message });
    }
    res.status(500).send('Server Error');
  }
});

// POST /api/plan/nutrition - Generate/Create a new nutrition plan
router.post('/nutrition', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const { bloodType, goal } = user; // currentWeight could also be used for calorie estimates later

    let mealSuggestions = {
      breakfast: 'Balanced breakfast (e.g., whole grain toast with avocado)',
      lunch: 'Mixed greens salad with lean protein',
      dinner: 'Baked chicken/fish with roasted vegetables',
      snacks: 'Fruits or nuts' // Added a default snack
    };
    let guidelines = ["Eat a balanced diet."];

    // Blood Type based suggestions (very high-level and simplified)
    switch (bloodType ? bloodType.toUpperCase() : 'UNKNOWN') {
      case 'A':
      case 'A+':
      case 'A-':
        mealSuggestions.breakfast = "Oatmeal with berries and nuts";
        mealSuggestions.lunch = "Lentil soup with whole grain bread";
        mealSuggestions.dinner = "Baked tofu with steamed broccoli and quinoa";
        mealSuggestions.snacks = "Apple slices with almond butter";
        guidelines = ["Focus on fruits, vegetables, and whole grains.", "Consider plant-based proteins."];
        break;
      case 'B':
      case 'B+':
      case 'B-':
        mealSuggestions.breakfast = "Scrambled eggs with a side of yogurt and fruit";
        mealSuggestions.lunch = "Grilled turkey salad with mixed greens";
        mealSuggestions.dinner = "Baked cod with roasted sweet potatoes and green beans";
        mealSuggestions.snacks = "Cheese stick or a handful of walnuts";
        guidelines = ["Include varied dairy, lean meats, and green vegetables.", "Avoid chicken and corn in excess if following strict B-type diet (traditional view)."];
        break;
      case 'AB':
      case 'AB+':
      case 'AB-':
        mealSuggestions.breakfast = "Tofu scramble with spinach and mushrooms";
        mealSuggestions.lunch = "Salmon salad with mixed greens";
        mealSuggestions.dinner = "Turkey meatballs with zucchini noodles";
        mealSuggestions.snacks = "Rice cakes with avocado";
        guidelines = ["Combine A and B type suggestions moderately.", "Focus on seafood, leafy greens, and dairy."];
        break;
      case 'O':
      case 'O+':
      case 'O-':
        mealSuggestions.breakfast = "Lean steak (small portion) with spinach and eggs";
        mealSuggestions.lunch = "Large salad with grilled chicken or beef";
        mealSuggestions.dinner = "Broiled salmon with asparagus and a small portion of sweet potato";
        mealSuggestions.snacks = "Beef jerky (low sodium) or berries";
        guidelines = ["Prioritize high-protein meals from lean meats and fish.", "Limit grains and legumes if following strict O-type diet (traditional view)."];
        break;
      default: // Default/Unknown blood type
        // mealSuggestions remain as initialized
        // guidelines remain as initialized
        break;
    }

    // Goal based guidelines
    switch (goal) {
      case 'Weight Loss':
        guidelines.push("Maintain a calorie deficit. Focus on portion control and high-fiber foods.");
        guidelines.push("Increase protein intake to preserve muscle mass.");
        if(mealSuggestions.lunch.includes("salad")) mealSuggestions.lunch += " (light dressing)";
        break;
      case 'Weight Gain':
        guidelines.push("Ensure a calorie surplus. Include protein-rich snacks and larger meal portions.");
        guidelines.push("Incorporate healthy fats like avocados, nuts, and seeds.");
        mealSuggestions.snacks += ", protein shake";
        break;
      case 'Endurance':
        guidelines.push("Focus on complex carbohydrates for sustained energy (e.g., oats, brown rice, sweet potatoes).");
        guidelines.push("Stay well hydrated and replenish electrolytes during long activities.");
        mealSuggestions.breakfast += ", banana";
        break;
    }

    guidelines.push("Drink at least 8 glasses of water a day.");
    guidelines.push("Adjust portion sizes based on your activity level and specific calorie needs.");
    guidelines.push("This is a sample plan. Consult a nutritionist for personalized advice.");


    const nutritionPlan = await NutritionPlan.findOneAndUpdate(
      { userId: req.user.id },
      {
        meals: mealSuggestions,
        guidelines: guidelines,
        goal: user.goal,
        planName: `${user.fullName}'s ${user.goal} Nutrition Plan` || `My ${user.goal} Nutrition Plan`,
        startDate: new Date(), // Set/update start date on new generation
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    res.status(201).json(nutritionPlan);

  } catch (err) {
    console.error('Error generating nutrition plan:', err.message);
    if (err.name === 'ValidationError') {
        return res.status(400).json({ message: err.message });
    }
    res.status(500).send('Server Error');
  }
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

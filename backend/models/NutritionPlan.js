const mongoose = require('mongoose');

// Sub-schema for meal details, allowing for more structure if needed later
// For now, keeping it simple as per request (breakfast, lunch, dinner as Strings)
// const mealDetailSchema = new mongoose.Schema({
//   description: { type: String, required: true },
//   calories: { type: Number }, // Optional
//   protein: { type: Number }, // Optional
//   carbs: { type: Number }, // Optional
//   fats: { type: Number } // Optional
// }, {_id: false});

const nutritionPlanSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true, // Assuming one primary nutrition plan per user. Remove if multiple plans are allowed.
  },
  planName: { // e.g., "My Weight Loss Diet", "High Protein Plan"
    type: String,
    required: false,
    default: 'My Nutrition Plan',
  },
  goal: { // Denormalized from User's goal at the time of plan creation
    type: String,
    required: false,
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  meals: { // As per request, an object with specific meal strings
    breakfast: {
      type: String,
      required: true,
    },
    lunch: {
      type: String,
      required: true,
    },
    dinner: {
      type: String,
      required: true,
    },
    // Optional: snacks or other meals could be added here
    snacks: {
        type: String,
        required: false
    }
  },
  // If meals were to be more structured:
  // meals: {
  //   breakfast: { type: mealDetailSchema, required: true },
  //   lunch: { type: mealDetailSchema, required: true },
  //   dinner: { type: mealDetailSchema, required: true },
  //   snacks: { type: [mealDetailSchema], required: false } // Example: array of snacks
  // },
  guidelines: { // General dietary guidelines
    type: [String],
    required: true,
  },
  // Optional: Specific calorie or macronutrient targets
  dailyCalorieTarget: {
    type: Number,
    required: false,
  },
  macronutrientTargets: { // Example structure
    proteinGrams: { type: Number, required: false },
    carbGrams: { type: Number, required: false },
    fatGrams: { type: Number, required: false },
  },
  notes: { // General notes for the nutrition plan
    type: String,
    required: false,
  }
}, { timestamps: true }); // Adds createdAt and updatedAt timestamps

const NutritionPlan = mongoose.model('NutritionPlan', nutritionPlanSchema);

module.exports = NutritionPlan;

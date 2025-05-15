const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true, lowercase: true },
  password: { type: String, required: true, minlength: 6 },

  // Additional user data for Heal-zy Fitness
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  weight: { type: Number, required: true }, // starting weight
  height: { type: Number, required: true },
  bloodType: { type: String, required: true },
  goal: { type: String, required: true },
  activityLevel: { type: String, required: true },

  // Progress & analytics support fields
  currentWeight: { type: Number }, // optional - can be updated after each log
  planStartDate: { type: Date }, // when plan tracking begins
  adherenceScore: { type: Number, default: 0 }, // optional: 0-100 score to reflect how well user is sticking to plan
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    try {
      this.password = await bcrypt.hash(this.password, 8);
    } catch (error) {
      return next(error);
    }
  }
  next();
});

// Compare entered password with stored hash
userSchema.methods.isValidPassword = async function(password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw new Error('Password comparison failed');
  }
};

const User = mongoose.model('User', userSchema);
module.exports = User;

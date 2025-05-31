const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // We'll need this for pre-save password hashing

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/.+\@.+\..+/, 'Please fill a valid email address']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long']
  },
  bloodType: {
    type: String,
    trim: true
    // Add enum validation if there's a predefined list later
  },
  weight: { // in kg
    type: Number
  },
  height: { // in cm
    type: Number
  },
  healthConditions: [{
    type: String,
    trim: true
  }],
  goals: {
    type: String,
    trim: true
    // Consider enum for goals: 'weightLoss', 'weightGain', 'endurance', 'muscleGain', 'fitnessMaintenance'
  },
  availability: { // Example structure
    daysPerWeek: Number, // e.g., 3
    hoursPerDay: Number  // e.g., 1.5
  }
  // Timestamps will be added by Mongoose by default if { timestamps: true } is the second arg to schema
}, {
  timestamps: true // Adds createdAt and updatedAt timestamps
});

// Pre-save hook to hash password
userSchema.pre('save', async function(next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS, 10) || 10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password for login
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;

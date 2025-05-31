require('dotenv').config(); // Must be at the very top

const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth'); // Import auth routes
const userRoutes = require('./routes/user'); // Import user routes

const app = express();
const port = process.env.PORT || 3001;

// Middleware to parse JSON request bodies
app.use(express.json());

// Mount auth routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes); // Mount user routes

// Basic route
app.get('/', (req, res) => {
  res.send('HealzyFitness API is running!');
});

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // Mongoose 6 always behaves as if useNewUrlParser, useUnifiedTopology,
      // and useCreateIndex are true, and useFindAndModify is false.
      // So, no need to specify them unless using an older Mongoose version.
    });
    console.log('MongoDB Connected...');

    // Start server only after DB connection is successful
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });

  } catch (err) {
    console.error('MongoDB Connection Error:', err.message);
    // Exit process with failure
    process.exit(1);
  }
};

connectDB();

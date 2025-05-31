const mongoose = require('mongoose');
const config = require('./config'); // To get MONGODB_URI

const connectDB = async () => {
  try {
    await mongoose.connect(config.mongoURI, {
      // useNewUrlParser and useUnifiedTopology are no longer needed in Mongoose 6+
      // useCreateIndex and useFindAndModify are also deprecated
    });
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error('MongoDB Connection Error:', err.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;

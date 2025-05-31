require('dotenv').config({ path: '../.env' }); // Adjusted path to point to .env in the backend root

module.exports = {
  port: process.env.PORT || 3001,
  mongoURI: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET,
  bcryptSaltRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS, 10) || 10,
  nodeEnv: process.env.NODE_ENV || 'development'
};

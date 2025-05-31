const express = require('express');
const connectDB = require('./config/db');
const config = require('./config/config'); // To get the port from config

// Connect to Database
connectDB();

const app = express();

// Init Middleware
// To parse JSON request bodies
app.use(express.json());
// To parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('API Running - Hello World!');
});

// Define Routes (placeholder for now)
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/plan', require('./routes/planRoutes'));
app.use('/api/progress', require('./routes/progressRoutes'));

// Global Error Handler
const { errorHandler } = require('./middleware/errorMiddleware');
app.use(errorHandler);

const PORT = config.port;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

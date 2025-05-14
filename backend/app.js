const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const path = require('path');

// Route imports
const authRoutes = require('./routes/authRoutes');
const progressRoutes = require('./routes/progressRoutes');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files
app.use(express.static('public'));

// API Routes
app.use('/api/auth', authRoutes);        // 🔐 Authentication routes
app.use('/api/progress', progressRoutes); // 📈 Progress tracking routes

// Serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// API endpoint for content
app.get('/api/content/:section', (req, res) => {
    // This is where you would typically fetch data from a database
    const section = req.params.section;
    res.json({
        title: section.charAt(0).toUpperCase() + section.slice(1),
        content: `Content for ${section} section`
    });
});

// Error-handling middleware
app.use((err, req, res, next) => {
  console.error('🚨 Server Error:', err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});

const express = require('express');
const router = express.Router();
const progressController = require('../controllers/progressController');

// POST endpoint to log progress
router.post('/log', progressController.logProgress);

// GET endpoint to fetch progress history
router.get('/history', progressController.getProgressHistory);

module.exports = router;

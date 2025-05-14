const express = require('express');
const router = express.Router();

// Sample content data (in a real application, this would come from a database)
const contentData = {
    about: {
        title: 'About',
        content: 'የድርቅ ትንበያ ስርዓት ን በተመለከተ መረጃ'
    },
    // Add more sections as needed
};

// Get content by section
router.get('/:section', (req, res) => {
    const section = req.params.section;
    const content = contentData[section];
    
    if (content) {
        res.json(content);
    } else {
        res.status(404).json({ error: 'Section not found' });
    }
});

module.exports = router; 
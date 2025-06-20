const express = require('express');
const router = express.Router();
const { summarizeEmail } = require('../controllers/summarizeController');

// POST /summarize
router.post('/summarize', summarizeEmail);

module.exports = router;

const express = require('express');
const router = express.Router();
const { generateReply } = require('../controllers/replyController');

// POST /reply
router.post('/reply', generateReply);

module.exports = router;

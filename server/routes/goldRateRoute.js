const express = require('express');
const router = express.Router();
const { getGoldRate } = require('../controllers/goldRateController');

router.get('/', getGoldRate);

module.exports = router;

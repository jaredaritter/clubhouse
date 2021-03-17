// IMPORT EXPRESS AND INITIALIZE ROUTER
const express = require('express');
const router = express.Router();

// IMPORT CONTROLLER MODULE
const general = require('../controllers/general');

// ROUTES
router.get('/', general.index);

router.get('/other', general.other_get);

// EXPORT ROUTER
module.exports = router;

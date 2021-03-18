// IMPORT EXPRESS AND INITIALIZE ROUTER
const express = require('express');
const router = express.Router();

// IMPORT CONTROLLER MODULE
const general = require('../controllers/general');

// ROUTES
router.get('/', general.index);

router.get('/register', general.register_get);

router.get('/login', general.login_get);

// EXPORT ROUTER
module.exports = router;

// ---------------------------------------
// ** IMPORT EXPRESS AND INITIALIZE ROUTER **
// ---------------------------------------
const express = require('express');
const router = express.Router();

// ---------------------------------------
// ** IMPORT CONTROLLER MODULE **
// ---------------------------------------
const general = require('../controllers/general');

// ---------------------------------------
// ** ROUTES **
// ---------------------------------------
router.get('/', general.index);

router.get('/register', general.register_get);

router.post('/register', general.register_post);

router.get('/login', general.login_get);

router.post('/login', general.login_post);

router.get('/join', general.join_get);

router.get('/logout', general.logout_get);

router.get('/error', general.error_get);

router.get('/test', general.test);

// ---------------------------------------
// ** EXPORT ROUTER **
// ---------------------------------------
module.exports = router;

// ---------------------------------------
// ** IMPORT EXPRESS AND INITIALIZE ROUTER **
// ---------------------------------------
const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

// ---------------------------------------
// ** IMPORT CONTROLLER MODULE **
// ---------------------------------------
const general = require('../controllers/general');

// ---------------------------------------
// ** PASSPORT SETUP **
// ---------------------------------------
passport.use(
  new LocalStrategy(function (username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  })
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

// ---------------------------------------
// ** ROUTES **
// ---------------------------------------
router.get('/', general.index);

router.get('/register', general.register_get);

router.post('/register', general.register_post);

router.get(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/',
  }),
  general.login_get
);

// ---------------------------------------
// ** EXPORT ROUTER **
// ---------------------------------------
module.exports = router;

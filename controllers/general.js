// ---------------------------------------
// ** IMPORT MODULES **
// ---------------------------------------
const passport = require('passport');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');

// ---------------------------------------
// ** IMPORT MODELS **
// ---------------------------------------
const User = require('../models/User');
const Secret = require('../models/Secret');
const { resolveInclude } = require('ejs');

// ---------------------------------------
// ** SELF EXPORTING CONTROLLERS **
// ---------------------------------------
// ------------------------------------
// ** INDEX **
// ------------------------------------
exports.index = (req, res, next) => {
  res.render('index', { user: req.user });
};

// ------------------------------------
// ** REGISTER **
// ------------------------------------
exports.register_get = (req, res, next) => {
  res.render('register', { errors: false });
};

exports.register_post = [
  body('firstname', 'First name is required').not().isEmpty().trim().escape(),
  body('lastname', 'Last name is required').not().isEmpty().trim().escape(),
  body('username', 'User name is required').not().isEmpty().trim().escape(),
  body('password', 'Password is required').not().isEmpty().trim().escape(),
  body('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Passwords do not match');
    }
    return true;
  }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render('register', { errors: errors.array() });
    }
    User.findOne({ username: req.body.username }, (err, foundUser) => {
      if (err) {
        return next(err);
      }
      if (foundUser) {
        res.redirect('/register');
      } else {
        bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
          const user = new User({
            first_name: req.body.firstname,
            last_name: req.body.lastname,
            username: req.body.username,
            password: hashedPassword,
          });
          user.save((err, user) => {
            if (err) return next(err);
            if (user) {
              console.log(user);
              res.redirect('/');
            }
          });
        });
      }
    });
  },
];

// ------------------------------------
// ** LOGIN **
// ------------------------------------
exports.login_get = (req, res, next) => {
  res.render('login');
};

exports.login_post = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/error',
});

// ------------------------------------
// ** JOIN **
// ------------------------------------
exports.join_get = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.render('join', { errors: false });
  } else {
    res.redirect('/login');
  }
};

exports.join_post = [
  (req, res, next) => {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.redirect('/login');
    }
  },
  body('passphrase', 'Please enter a passphrase')
    .not()
    .isEmpty()
    .trim()
    .escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render('join', { errors: errors.array() });
    } else {
      Secret.find().exec((err, secrets) => {
        if (err) return next(err);
        if (secrets[0].passphrase !== req.body.passphrase) {
          res.render('join', { errors: false });
          // res.send('<h1>That is not the correct passphrase</h1>');
        } else {
          res.send('<h1>Welcome to the club</h1>');
        }
      });
    }
  },
];
// ------------------------------------
// ** LOGOUT **
// ------------------------------------
exports.logout_get = (req, res, next) => {
  req.logout();
  res.redirect('/');
};

// ------------------------------------
// ** ERROR **
// ------------------------------------
exports.error_get = (req, res, next) => {
  res.render('error');
};

// ------------------------------------
// ** EXTRAS **
// ------------------------------------
exports.test = [
  (req, res, next) => {
    req.foo = 'bar';
    next();
  },
  (req, res, next) => {
    req.bar = 'baz';
    next();
  },
  (req, res, next) => {
    res.render('test', { foo: req.foo, bar: req.bar });
  },
];

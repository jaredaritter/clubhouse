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
const Message = require('../models/Message');

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
  body('firstname', 'First name is required.').not().isEmpty().trim().escape(),
  body('lastname', 'Last name is required.').not().isEmpty().trim().escape(),
  body('username', 'User name is required').not().isEmpty().trim().escape(),
  body('password', 'Password is required').not().isEmpty().trim().escape(),
  body('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Password confirmation does not match password.');
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
exports.join_get = [
  passport.authenticate('local'),
  (req, res, next) => {
    res.render('join');
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

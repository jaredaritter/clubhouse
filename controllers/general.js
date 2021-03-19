// ---------------------------------------
// ** IMPORT MODULES **
// ---------------------------------------
const passport = require('passport');

// ---------------------------------------
// ** IMPORT MODELS **
// ---------------------------------------
const User = require('../models/User');
const Message = require('../models/Message');

// ---------------------------------------
// ** SELF EXPORTING CONTROLLERS **
// ---------------------------------------
exports.index = (req, res, next) => {
  res.render('index', { user: req.user });
};

exports.register_get = (req, res, next) => {
  res.render('register');
};

exports.register_post = (req, res, next) => {
  const user = new User({
    first_name: req.body.firstname,
    last_name: req.body.lastname,
    username: req.body.username,
    password: req.body.password,
  });
  User.findOne({ username: user.username }, (err, foundUser) => {
    if (err) {
      return next(err);
    }
    if (foundUser) {
      res.redirect('/register');
    } else {
      user.save((err, user) => {
        if (err) return next(err);
        if (user) {
          console.log(user);
          res.redirect('/');
        }
      });
    }
  });
};

exports.login_get = (req, res, next) => {
  res.render('login');
};

exports.login_post = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/error',
});

exports.logout_get = (req, res, next) => {
  req.logout();
  res.redirect('/');
};

exports.error_get = (req, res, next) => {
  res.render('error');
};

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

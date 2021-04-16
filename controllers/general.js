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
const Secret = require('../models/Secret');

// ---------------------------------------
// ** SELF EXPORTING CONTROLLERS **
// ---------------------------------------
// ------------------------------------
// ** INDEX **
// ------------------------------------
exports.index = (req, res, next) => {
  Message.find({})
    .populate('author')
    .exec((err, messages) => {
      if (err) {
        return next(err);
      } else {
        res.render('index', { user: req.user, messages: messages });
      }
    });
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
      console.log(errors.array());
      return res.status(400).render('register', { errors: errors.array() });
    }
    User.findOne({ username: req.body.username }, (err, foundUser) => {
      if (err) {
        return next(err);
      }
      if (foundUser) {
        const error = [{ msg: 'User name already in use' }];
        return res.status(400).render('register', { errors: error });
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
              console.log('Saved user: ' + user.username);
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
  body('passphrase', 'Please enter a passphrase').not().isEmpty().escape(),
  body('admin', 'Something is wrong with your admin entry').escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render('join', { errors: errors.array() });
    } else {
      Secret.findOne({ name: 'passphrase' }, function (err, secret) {
        if (err) return next(err);
        let isAdmin = false;
        if (secret.admin === req.body.admin) {
          isAdmin = true;
        }
        if (secret.passphrase !== req.body.passphrase) {
          const error = [{ msg: 'Sorry, that is not the correct passphrase' }];
          res.render('join', { errors: error });
        } else {
          // console.log(req);
          User.findByIdAndUpdate(
            req.user._id,
            { member: true, admin: isAdmin },
            { new: true },
            (err, user) => {
              if (err) return next(err);
              console.log(user.member);
              res.render('member', { user: user });
            }
          );
        }
      });
    }
  },
];

// ------------------------------------
// ** MESSAGE **
// ------------------------------------
exports.message_get = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.render('message', { errors: false });
  } else {
    res.redirect('/login');
  }
};

exports.message_post = [
  (req, res, next) => {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.redirect('/login');
    }
  },
  // VALIDATE
  body('title', 'Title can not be empty.').not().isEmpty().trim().escape(),
  body('text', 'Text can not be empty.').not().isEmpty().trim().escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render('message', { errors: errors.array() });
    }
    const message = new Message({
      title: req.body.title,
      text: req.body.text,
      author: req.user._id,
    }).save((err, message) => {
      if (err) return next(err);
      if (message) {
        res.render('message', { errors: false });
      }
    });
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

exports.addSecret = (req, res, next) => {
  const secret = new Secret({
    name: 'passphrase',
    passphrase: 'opensesame',
    admin: 'bossypants',
  }).save((err, secret) => {
    if (err) return next(err);
    res.send('<h1>Secret saved</h1>');
  });
};

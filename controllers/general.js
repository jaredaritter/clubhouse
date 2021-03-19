// ---------------------------------------
// ** IMPORT MODELS **
// ---------------------------------------
const User = require('../models/User');
const Message = require('../models/Message');

// ---------------------------------------
// ** SELF EXPORTING CONTROLLERS **
// ---------------------------------------
exports.index = (req, res, next) => {
  res.render('index');
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
  }).save((err, user) => {
    if (err) return next(err);
    if (user) {
      console.log(user);
      res.redirect('/login');
    }
  });
};

exports.login_get = (req, res, next) => {
  res.render('login');
};

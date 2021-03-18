// IMPORT MODELS
const User = require('../models/User');
const Message = require('../models/Message');

// SELF EXPORTING CONTROLLERS
exports.index = (req, res, next) => {
  res.render('index');
};

exports.register_get = (req, res, next) => {
  res.render('register');
};

exports.login_get = (req, res, next) => {
  res.render('login');
};

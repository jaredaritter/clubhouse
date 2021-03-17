// IMPORT MODELS
const User = require('../models/User');
const Message = require('../models/Message');

// SELF EXPORTING CONTROLLERS
exports.index = (req, res, next) => {
  const message = new Message({
    title: 'Title goes here',
    text: 'This is a test message',
  });
  message.save((err) => {
    if (err) return next(err);
  });
  res.send('<h1>Working route</h1>');
};

exports.other_get = (req, res, next) => {
  res.send('<h1>Also Working</h1>');
};

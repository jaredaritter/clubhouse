const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  title: { type: String, required: true },
  date: { type: Date, default: Date.now, required: true },
  text: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Message', MessageSchema);

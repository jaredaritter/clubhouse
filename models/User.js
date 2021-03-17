const mongoose = require('mongoose');

// DEFINE A SCHEMA
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  member: { type: Boolean, default: false, required: true },
  messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
});

UserSchema.virtual('fullName').get(function () {
  return this.name.first + ' ' + this.name.last;
});

// COMPILE MODEL FROM SCHEMA
module.exports = mongoose.model('User', UserSchema);

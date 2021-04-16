const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SecretSchema = new Schema({
  name: { type: String, required: true },
  passphrase: { type: String, required: true },
  admin: { type: String, required: true },
});

module.exports = mongoose.model('Secret', SecretSchema);

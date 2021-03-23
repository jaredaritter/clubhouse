const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SecretSchema = new Schema({
  passphrase: { type: String },
});

module.exports = mongoose.model('Secret', SecretSchema);

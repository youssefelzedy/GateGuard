const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  nationalSecurityNumber: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  garage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Garage',
    required: true,
  },
  carPlate: { type: String, required: true, unique: true },
});

const User = mongoose.model('User', userSchema);

module.exports = User;

const mongoose = require('mongoose');

// Admin Schema
const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  nationalSecurityNumber: { type: String, required: true, unique: true },
  role: {
    type: String,
    enum: ['Owner', 'Observer'],
    default: 'Observer',
    required: true,
  },
  registeredDate: { type: Date, default: Date.now },
  garage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Garage',
    required: true,
  },
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;

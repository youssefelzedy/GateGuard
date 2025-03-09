const e = require('express');
const mongoose = require('mongoose');

const garageSchema = new mongoose.Schema({
  garageName: { type: String, required: true, unique: true },
  location: { type: String, required: true, unique: true },
  currentOccupancy: { type: Number, default: 0, required: true },
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

const Garage = mongoose.model('Garage', garageSchema);

module.exports = Garage;

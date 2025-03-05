const mongoose = require('mongoose');

const garageSchema = new mongoose.Schema({
  location: { type: String, required: true, unique: true },
  currentOccupancy: { type: Number, default: 0, required: true },
});

const Garage = mongoose.model('Garage', garageSchema);

module.exports = Garage;

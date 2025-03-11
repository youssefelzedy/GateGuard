const e = require('express');
const mongoose = require('mongoose');

const garageSchema = new mongoose.Schema(
  {
    garageName: { type: String, required: true, unique: true },
    location: { type: String, required: true, unique: true },
    currentOccupancy: { type: Number, default: 0, required: true },
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

//Virtual population
garageSchema.virtual('admin', {
  ref: 'Admin',
  foreignField: 'garage',
  localField: '_id',
});

garageSchema.virtual('logs', {
  ref: 'Log',
  foreignField: 'garage',
  localField: '_id',
});

garageSchema.pre(/^find/, function (next) {
  this.populate({ path: 'admin', select: 'name email' });
  next();
});

const Garage = mongoose.model('Garage', garageSchema);

module.exports = Garage;

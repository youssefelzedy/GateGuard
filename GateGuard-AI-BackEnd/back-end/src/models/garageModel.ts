import mongoose, { Document } from 'mongoose';
import IGarage from '../interfaces/intGarage';

const garageSchema = new mongoose.Schema(
  {
    garageName: { type: String, required: true, unique: true },
    location: { type: String, required: true },
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

// garageSchema.pre<IGarage>(/^find/, function (next) {
//   this.populate({ path: 'admin', select: 'name email' });
//   next();
// });

export const Garage = mongoose.model<IGarage>('Garage', garageSchema);

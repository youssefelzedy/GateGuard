import mongoose from 'mongoose';
import ICamera from '../interfaces/intCamera';

const cameraSchema = new mongoose.Schema<ICamera>(
  {
    cameraIP: {
      type: String,
      required: true,
      unique: true,
    },
    cameraName: {
      type: String,
      required: true,
    },
    garage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Garage',
      required: true,
    },
    cameraStatus: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
  },
  { timestamps: true },
);

cameraSchema.pre('find', function (next) {
  this.where({ cameraStatus: 'active' });
  next();
});

const Camera = mongoose.model<ICamera>('Camera', cameraSchema);
export default Camera;

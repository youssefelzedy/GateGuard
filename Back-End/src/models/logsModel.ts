import mongoose from 'mongoose';
import ILog from '../interfaces/intLog';

const logSchema = new mongoose.Schema({
  action: { type: String, enum: ['Denied', 'Accepted'], required: true },
  // Store image URL or base64
  carDetection: { type: [[Number]], default: [] }, // Array of arrays of numbers
  plateDetection: { type: [[Number]], default: [] }, // Array of arrays of numbers
  accessTime: { type: Date, default: Date.now, required: true },
  garage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Garage',
    required: true,
  },
});

// Remove unique constraint on plateId and add compound indexa

export const Logs = mongoose.model<ILog>('Logs', logSchema);

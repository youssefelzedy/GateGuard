import mongoose from 'mongoose';
import ILog from '../interfaces/intLog';

const logSchema = new mongoose.Schema({
  action: { type: String, enum: ['Denied', 'Accepted'], required: true },
  screenshot: { type: String }, // Store image URL or base64
  plateId: { type: String }, // Detected plate number
  carDetection: { type: [[Number]], default: [] }, // Array of arrays of numbers
  plateDetection: { type: [[Number]], default: [] }, // Array of arrays of numbers
  accessTime: { type: Date, default: Date.now, required: true },
  processed: { type: Boolean, default: false }, // Track if hardware has processed this log
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null, // Can be null for denied access
  },
  garage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Garage',
    required: true,
  },
});

// Remove unique constraint on plateId and add compound indexa

export const Logs = mongoose.model<ILog>('Logs', logSchema);

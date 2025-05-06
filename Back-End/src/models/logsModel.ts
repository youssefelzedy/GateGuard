import mongoose from 'mongoose';
import ILog from '../interfaces/intLog';

const logSchema = new mongoose.Schema({
  action: { type: String, enum: ['Denied', 'Accepted'], required: true },
  screenshot: { type: String }, // Store image URL or base64
  accessTime: { type: Date, default: Date.now, required: true },
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  garage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Garage',
    required: true,
  },
});

// Remove unique constraint on plateId and add compound indexa

export const Logs = mongoose.model<ILog>('Logs', logSchema);

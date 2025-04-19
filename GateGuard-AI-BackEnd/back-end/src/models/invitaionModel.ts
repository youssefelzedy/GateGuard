import mongoose, { Document } from 'mongoose';
import IInvitation from '../interfaces/intInvitation';
import crypto from 'crypto';

// Define Schema
const invitationSchema = new mongoose.Schema<IInvitation>({
  email: {
    type: String,
    required: [true, 'An invitation must have an email'],
    lowercase: true,
  },
  garage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Garage',
    required: [true, 'An invitation must be associated with a garage'],
  },
  invitedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    required: [true, 'An invitation must have an inviter'],
  },
  token: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['admin', 'user'],
    required: true,
  },
  expires: {
    type: Date,
    required: true,
    default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
  },
  accepted: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Indexes for Efficient Queries
invitationSchema.index({ email: 1, garage: 1 }, { unique: true });
invitationSchema.index({ token: 1 });
invitationSchema.index({ expires: 1 });

// Middleware: Generate Token Before Validation
invitationSchema.pre<IInvitation>('validate', function (next) {
  if (!this.token) {
    this.token = crypto.randomBytes(32).toString('hex');
  }
  next();
});

// Export Model
export const Invitation = mongoose.model<IInvitation>(
  'Invitation',
  invitationSchema,
);

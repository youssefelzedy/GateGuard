import mongoose, { Document } from 'mongoose';
import IUser from '../interfaces/intUser';

const userSchema = new mongoose.Schema<IUser>({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
  },
  nationalSecurityNumber: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true, unique: true },
  garage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Garage',
    required: true,
  },
  carPlate: { type: String, required: true, unique: true },
});

export const User = mongoose.model<IUser>('User', userSchema);

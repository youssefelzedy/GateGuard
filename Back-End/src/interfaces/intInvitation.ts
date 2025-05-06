import e from 'express';
import mongoose, { Document } from 'mongoose';

export interface IInvitation extends Document {
  email: string;
  garage: mongoose.Types.ObjectId;
  invitedBy: mongoose.Types.ObjectId;
  type: 'admin' | 'user';
  token: string;
  expires: Date;
  accepted: boolean;
  createdAt: Date;
}

export default IInvitation;

import mongoose, { Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  status: 'active' | 'inactive';
  nationalSecurityNumber: string;
  phoneNumber: string;
  garage: mongoose.Types.ObjectId;
  carPlate: string;
}

export default IUser;

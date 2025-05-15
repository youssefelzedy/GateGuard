import mongoose, { Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  nationalSecurityNumber: string;
  phoneNumber: string;
  garage: mongoose.Types.ObjectId;
  carPlate: string;
  status: 'active' | 'inactive';
}

export default IUser;

import mongoose, { Document } from 'mongoose';

export interface IAdmin extends Document {
  name: string;
  email: string;
  password: string;
  passwordConfirm?: string;
  phoneNumber: string;
  nationalSecurityNumber: string;
  role: 'Owner' | 'Observer';
  registeredDate: Date;
  garage: mongoose.Types.ObjectId;
  passwordChangedAt?: Date;
  passwordResetToken?: string;
  passwordResetExpires?: Date;

  correctPassword(
    candidatePassword: string,
    userPassword: string,
  ): Promise<boolean>;
  changedPasswordAfter(JWTTimestamp: number): boolean;
  createPasswordResetToken(): string;
}

export default IAdmin;

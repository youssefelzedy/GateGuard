import mongoose, { Document } from 'mongoose';
import IAdmin from '../interfaces/intAdmin';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

// Define Admin Interface

// Admin Schema
const adminSchema = new mongoose.Schema<IAdmin>({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
  image: {
    type: String,
    default: 'default.jpg',
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      validator: function (this: IAdmin, el: string): boolean {
        return el === this.password;
      },
      message: 'Passwords are not the same',
    },
  },
  phoneNumber: { type: String, required: true },
  nationalSecurityNumber: { type: String, required: true, unique: true },
  role: {
    type: String,
    enum: ['Owner', 'Observer'],
    required: true,
  },
  registeredDate: { type: Date, default: Date.now },
  garage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Garage',
    required: true,
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
});

// Pre-save middleware: Hash password before saving
adminSchema.pre<IAdmin>('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined; // Remove confirm field after validation

  next();
});

// Pre-save middleware: Update `passwordChangedAt` if password is modified
adminSchema.pre<IAdmin>('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = new Date(Date.now() - 1000); // Ensure JWT is issued after password change
  next();
});

// Instance Method: Check if entered password is correct
adminSchema.methods.correctPassword = async function (
  candidatePassword: string,
  userPassword: string,
): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// Instance Method: Check if password changed after JWT token was issued
adminSchema.methods.changedPasswordAfter = function (
  this: IAdmin,
  JWTTimestamp: number,
): boolean {
  if (this.passwordChangedAt) {
    const changedTimestamp = Math.floor(
      this.passwordChangedAt.getTime() / 1000,
    );
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

// Instance Method: Generate password reset token
adminSchema.methods.createPasswordResetToken = function (this: IAdmin): string {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  this.passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  return resetToken;
};

adminSchema.pre(/^find/, function (next) {
  this.populate({ path: 'garage', select: 'garageName location' });
  next();
});

export const Admin = mongoose.model<IAdmin>('Admin', adminSchema);

// Create for me camera interface
import mongoose, { Document } from 'mongoose';

interface ICamera extends Document {
  cameraIP: string;
  cameraName: string;
  garage: mongoose.Types.ObjectId;
  cameraStatus: 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
}

export default ICamera;

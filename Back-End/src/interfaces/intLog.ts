import { Document } from 'mongoose';
import mongoose from 'mongoose';

interface ILog extends Document {
  action: 'Denied' | 'Accepted';
  screenshot?: string;
  plateId?: string;
  carDetection?: number[][];
  plateDetection?: number[][];
  accessTime: Date;
  processed: boolean;
  user?: mongoose.Types.ObjectId;
  garage: mongoose.Types.ObjectId;
}

export default ILog;

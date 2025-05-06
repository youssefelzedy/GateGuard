import { Document } from 'mongoose';
import mongoose from 'mongoose';

interface ILog extends Document {
  action: 'Denied' | 'Accepted';
  screenshot: string;
  accessTime: Date;
  plateId: string;
  garage: mongoose.Types.ObjectId;
}

export default ILog;

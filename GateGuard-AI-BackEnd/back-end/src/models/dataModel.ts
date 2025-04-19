import mongoose from 'mongoose';

const DataSchema = new mongoose.Schema({
  value: Number,
  timestamp: Date,
});

export const Data = mongoose.model('Data', DataSchema);

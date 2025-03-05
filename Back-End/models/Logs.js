const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  action: { type: String, enum: ['Denied', 'Accepted'], required: true },
  screenshot: { type: String }, // Store image URL or base64
  accessTime: { type: Date, default: Date.now, required: true },
  plateId: { type: String, required: true, unique: true },
  garage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Garage',
    required: true,
  },
});

// Remove unique constraint on plateId and add compound index

const Logs = mongoose.model('Logs', logSchema);

module.exports = Logs;

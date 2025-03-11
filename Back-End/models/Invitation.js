const mongoose = require('mongoose');
const crypto = require('crypto');

const invitationSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'An invitation must have an email'],
    lowercase: true,
  },
  garage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Garage',
    required: [true, 'An invitation must be associated with a garage'],
  },
  invitedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    required: [true, 'An invitation must have an inviter'],
  },
  token: {
    type: String,
    required: true,
  },
  expires: {
    type: Date,
    required: true,
    default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
  },
  accepted: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Indexes to make queries more efficient
invitationSchema.index({ email: 1, garage: 1 }, { unique: true });
invitationSchema.index({ token: 1 });
invitationSchema.index({ expires: 1 });

// Generate a random token for the invitation BEFORE validation
invitationSchema.pre('validate', function (next) {
  if (!this.token) {
    this.token = crypto.randomBytes(32).toString('hex');
  }
  next();
});

const Invitation = mongoose.model('Invitation', invitationSchema);

module.exports = Invitation;

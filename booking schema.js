// models/Booking.js
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  loadId: { type: mongoose.Schema.Types.ObjectId, ref: 'Load', required: true },
  transporterId: { type: String, required: true },
  proposedRate: Number,
  comment: String,
  status: { type: String, enum: ['PENDING', 'ACCEPTED', 'REJECTED'], default: 'PENDING' },
  requestedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', bookingSchema);
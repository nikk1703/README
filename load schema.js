// models/Load.js
const mongoose = require('mongoose');

const facilitySchema = new mongoose.Schema({
  loadingPoint: String,
  unloadingPoint: String,
  loadingDate: Date,
  unloadingDate: Date
}, { _id: false });

const loadSchema = new mongoose.Schema({
  shipperId: { type: String, required: true },
  facility: facilitySchema,
  productType: String,
  truckType: String,
  noOfTrucks: Number,
  weight: Number,
  comment: String,
  datePosted: { type: Date, default: Date.now },
  status: { type: String, enum: ['POSTED', 'BOOKED', 'CANCELLED'], default: 'POSTED' }
});

module.exports = mongoose.model('Load', loadSchema);
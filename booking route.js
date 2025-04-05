// routes/booking.js
const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Load = require('../models/Load');

// POST /booking
router.post('/', async (req, res) => {
  const load = await Load.findById(req.body.loadId);
  if (!load || load.status === 'CANCELLED') {
    return res.status(400).json({ error: 'Cannot book a cancelled or non-existent load' });
  }

  const booking = new Booking(req.body);
  const savedBooking = await booking.save();

  load.status = 'BOOKED';
  await load.save();

  res.status(201).json(savedBooking);
});

// GET /booking
router.get('/', async (req, res) => {
  const filter = req.query;
  const bookings = await Booking.find(filter).populate('loadId');
  res.json(bookings);
});

// GET /booking/:id
router.get('/:id', async (req, res) => {
  const booking = await Booking.findById(req.params.id).populate('loadId');
  if (!booking) return res.status(404).json({ error: 'Booking not found' });
  res.json(booking);
});

// PUT /booking/:id
router.put('/:id', async (req, res) => {
  const updated = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (req.body.status === 'ACCEPTED') {
    await Load.findByIdAndUpdate(updated.loadId, { status: 'BOOKED' });
  }
  res.json(updated);
});

// DELETE /booking/:id
router.delete('/:id', async (req, res) => {
  const booking = await Booking.findByIdAndDelete(req.params.id);
  if (booking) {
    await Load.findByIdAndUpdate(booking.loadId, { status: 'CANCELLED' });
  }
  res.status(204).send();
});

module.exports = router;
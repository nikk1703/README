// routes/load.js
const express = require('express');
const router = express.Router();
const Load = require('../models/Load');

// POST /load
router.post('/', async (req, res) => {
  try {
    const load = new Load(req.body);
    const savedLoad = await load.save();
    res.status(201).json(savedLoad);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /load
router.get('/', async (req, res) => {
  const filter = req.query;
  const loads = await Load.find(filter);
  res.json(loads);
});

// GET /load/:id
router.get('/:id', async (req, res) => {
  const load = await Load.findById(req.params.id);
  if (!load) return res.status(404).json({ error: 'Load not found' });
  res.json(load);
});

// PUT /load/:id
router.put('/:id', async (req, res) => {
  const updated = await Load.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// DELETE /load/:id
router.delete('/:id', async (req, res) => {
  await Load.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

module.exports = router;
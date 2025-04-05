// app.js
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

const loadRoutes = require('./routes/load');
const bookingRoutes = require('./routes/booking');

const app = express();

mongoose.connect('mongodb://localhost:27017/loadbooking');

app.use(express.json());
app.use(morgan('dev'));

app.use('/load', loadRoutes);
app.use('/booking', bookingRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(3000, () => console.log('Server running on port 3000'));
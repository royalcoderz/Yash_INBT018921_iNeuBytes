const express = require('express');
const Appointment = require('../models/Appointment');
const router = express.Router();


router.post('/book', async (req, res) => {
  const { patientId, doctorId, date } = req.body;
  const appointment = new Appointment({ patientId, doctorId, date });
  await appointment.save();
  res.json({ message: "Appointment booked", appointment });
});


router.get('/', async (req, res) => {
  const appointments = await Appointment.find().populate('patientId doctorId');
  res.json(appointments);
});

module.exports = router;

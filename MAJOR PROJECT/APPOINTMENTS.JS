const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: String,
  status: { type: String, enum: ['booked', 'completed', 'cancelled'], default: 'booked' }
});

module.exports = mongoose.model('Appointment', appointmentSchema);

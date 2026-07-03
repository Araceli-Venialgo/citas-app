const express = require('express');
const router = express.Router();
const {
  getAppointments,
  createAppointment,
  deleteAppointment,
  updateAppointmentStatus
} = require('../controllers/appointmentController');

// Routes
router.get('/', getAppointments);
router.post('/', createAppointment);
router.patch('/:id/status', updateAppointmentStatus);
router.delete('/:id', deleteAppointment);

module.exports = router;

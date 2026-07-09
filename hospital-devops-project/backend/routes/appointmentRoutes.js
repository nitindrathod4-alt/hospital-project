const express = require('express');
const router = express.Router();
const { auth, authorize } = require('../middleware/auth');
const appointmentController = require('../controllers/appointmentController');

router.use(auth);

// Book appointment
router.post('/', appointmentController.bookAppointment);

// Get patient appointments
router.get('/patient/:patientId', appointmentController.getPatientAppointments);

// Get doctor appointments
router.get('/doctor/:doctorId', authorize('doctor', 'admin'), appointmentController.getDoctorAppointments);

// Cancel appointment
router.put('/:id/cancel', appointmentController.cancelAppointment);

// Update appointment status
router.put('/:id/status', authorize('doctor'), appointmentController.updateAppointmentStatus);

module.exports = router;

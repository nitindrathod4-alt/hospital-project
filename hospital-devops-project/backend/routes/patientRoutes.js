const express = require('express');
const router = express.Router();
const { auth, authorize } = require('../middleware/auth');
const patientController = require('../controllers/patientController');

// All patient routes require authentication
router.use(auth);

// Admin and Doctor can view all patients
router.get('/', authorize('admin', 'doctor'), patientController.getAllPatients);

// Get single patient
router.get('/:id', patientController.getSinglePatient);

// Add patient (admin only)
router.post('/', authorize('admin'), patientController.addPatient);

// Update patient
router.put('/:id', patientController.updatePatient);

// Delete patient (admin only)
router.delete('/:id', authorize('admin'), patientController.deletePatient);

module.exports = router;

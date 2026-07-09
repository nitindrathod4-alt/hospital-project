const express = require('express');
const router = express.Router();
const { auth, authorize } = require('../middleware/auth');
const prescriptionController = require('../controllers/prescriptionController');

router.use(auth);

// Create prescription (doctor only)
router.post('/', authorize('doctor'), prescriptionController.createPrescription);

// Get patient prescriptions
router.get('/patient/:patientId', prescriptionController.getPatientPrescriptions);

// Get single prescription
router.get('/:id', prescriptionController.getPrescription);

// Update prescription (doctor only)
router.put('/:id', authorize('doctor'), prescriptionController.updatePrescription);

module.exports = router;

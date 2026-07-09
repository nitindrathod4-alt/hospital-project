const express = require('express');
const router = express.Router();
const { auth, authorize } = require('../middleware/auth');
const billingController = require('../controllers/billingController');

router.use(auth);

// Create billing (doctor/admin only)
router.post('/', authorize('doctor', 'admin'), billingController.createBilling);

// Get patient bills
router.get('/patient/:patientId', billingController.getPatientBills);

// Get single bill
router.get('/:id', billingController.getBill);

// Process payment
router.put('/:id/payment', billingController.processPayment);

// Get billing stats (admin only)
router.get('/stats/dashboard', authorize('admin'), billingController.getBillingStats);

module.exports = router;

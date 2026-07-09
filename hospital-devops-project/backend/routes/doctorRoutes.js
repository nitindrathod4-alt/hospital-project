const express = require('express');
const router = express.Router();
const { auth, authorize } = require('../middleware/auth');
const doctorController = require('../controllers/doctorController');

// Public routes
router.get('/', doctorController.getAllDoctors);
router.get('/:id', doctorController.getSingleDoctor);
router.get('/:id/schedule', doctorController.getDoctorSchedule);

// Private routes (admin only for add/update/delete)
router.use(auth);
router.post('/', authorize('admin'), doctorController.addDoctor);
router.put('/:id', authorize('admin'), doctorController.updateDoctor);
router.delete('/:id', authorize('admin'), doctorController.deleteDoctor);

module.exports = router;

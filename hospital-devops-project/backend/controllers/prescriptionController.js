const Prescription = require('../models/Prescription');
const logger = require('../config/logger');

// @desc Create prescription
// @route POST /api/prescriptions
// @access Private/Doctor
exports.createPrescription = async (req, res) => {
  try {
    const { appointmentId, patientId, doctorId, medications, diagnosis, testRecommendations, followUpDate, notes } = req.body;

    if (!appointmentId || !patientId || !doctorId || !medications || !diagnosis) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    const invoiceNumber = `PRE-${Date.now()}`;

    const prescription = await Prescription.create({
      invoiceNumber,
      appointmentId,
      patientId,
      doctorId,
      medications,
      diagnosis,
      testRecommendations,
      followUpDate,
      notes,
      issuedBy: req.user._id,
      expiryDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days
    });

    logger.info(`Prescription created: ${prescription._id}`);

    res.status(201).json({
      success: true,
      message: 'Prescription created successfully',
      data: prescription,
    });
  } catch (error) {
    logger.error(`Create prescription error: ${error.message}`);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Get patient prescriptions
// @route GET /api/prescriptions/patient/:patientId
// @access Private
exports.getPatientPrescriptions = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const total = await Prescription.countDocuments({ patientId: req.params.patientId });
    const prescriptions = await Prescription.find({ patientId: req.params.patientId })
      .populate('doctorId', 'userId')
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ prescriptionDate: -1 });

    res.status(200).json({
      success: true,
      message: 'Prescriptions retrieved successfully',
      data: prescriptions,
      pagination: { total, pages: Math.ceil(total / limit) },
    });
  } catch (error) {
    logger.error(`Get prescriptions error: ${error.message}`);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Get single prescription
// @route GET /api/prescriptions/:id
// @access Private
exports.getPrescription = async (req, res) => {
  try {
    const prescription = await Prescription.findById(req.params.id)
      .populate('doctorId')
      .populate('patientId')
      .populate('appointmentId');

    if (!prescription) {
      return res.status(404).json({ success: false, message: 'Prescription not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Prescription retrieved successfully',
      data: prescription,
    });
  } catch (error) {
    logger.error(`Get prescription error: ${error.message}`);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Update prescription
// @route PUT /api/prescriptions/:id
// @access Private/Doctor
exports.updatePrescription = async (req, res) => {
  try {
    let prescription = await Prescription.findById(req.params.id);

    if (!prescription) {
      return res.status(404).json({ success: false, message: 'Prescription not found' });
    }

    const updatableFields = ['medications', 'diagnosis', 'testRecommendations', 'followUpDate', 'notes', 'status'];

    updatableFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        prescription[field] = req.body[field];
      }
    });

    prescription = await prescription.save();

    logger.info(`Prescription updated: ${prescription._id}`);

    res.status(200).json({
      success: true,
      message: 'Prescription updated successfully',
      data: prescription,
    });
  } catch (error) {
    logger.error(`Update prescription error: ${error.message}`);
    res.status(500).json({ success: false, message: error.message });
  }
};

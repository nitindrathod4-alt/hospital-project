const Patient = require('../models/Patient');
const User = require('../models/User');
const logger = require('../config/logger');

// @desc Get all patients
// @route GET /api/patients?page=1&limit=10&search=name
// @access Private/Admin
exports.getAllPatients = async (req, res) => {
  try {
    const { page = 1, limit = 10, search, status } = req.query;
    const skip = (page - 1) * limit;

    let query = {};
    if (search) {
      query = {
        $or: [
          { 'userId.firstName': { $regex: search, $options: 'i' } },
          { 'userId.lastName': { $regex: search, $options: 'i' } },
          { 'userId.email': { $regex: search, $options: 'i' } },
        ],
      };
    }
    if (status) query.status = status;

    const total = await Patient.countDocuments(query);
    const patients = await Patient.find(query)
      .populate('userId', 'firstName lastName email phone')
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: 'Patients retrieved successfully',
      data: patients,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        currentPage: parseInt(page),
        limit: parseInt(limit),
      },
    });
  } catch (error) {
    logger.error(`Get all patients error: ${error.message}`);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Get single patient
// @route GET /api/patients/:id
// @access Private
exports.getSinglePatient = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id).populate('userId');

    if (!patient) {
      return res.status(404).json({ success: false, message: 'Patient not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Patient retrieved successfully',
      data: patient,
    });
  } catch (error) {
    logger.error(`Get single patient error: ${error.message}`);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Add patient
// @route POST /api/patients
// @access Private
exports.addPatient = async (req, res) => {
  try {
    const {
      userId,
      dateOfBirth,
      gender,
      address,
      bloodGroup,
      emergencyContact,
      height,
      weight,
      allergies,
    } = req.body;

    if (!userId || !dateOfBirth || !gender || !height || !weight) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields',
      });
    }

    // Check if patient already exists
    const existingPatient = await Patient.findOne({ userId });
    if (existingPatient) {
      return res.status(400).json({
        success: false,
        message: 'Patient record already exists',
      });
    }

    const patient = await Patient.create({
      userId,
      dateOfBirth,
      gender,
      address,
      bloodGroup,
      emergencyContact,
      height,
      weight,
      allergies,
    });

    logger.info(`Patient added: ${patient._id}`);

    res.status(201).json({
      success: true,
      message: 'Patient added successfully',
      data: patient,
    });
  } catch (error) {
    logger.error(`Add patient error: ${error.message}`);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Update patient
// @route PUT /api/patients/:id
// @access Private
exports.updatePatient = async (req, res) => {
  try {
    let patient = await Patient.findById(req.params.id);

    if (!patient) {
      return res.status(404).json({ success: false, message: 'Patient not found' });
    }

    const updatableFields = [
      'dateOfBirth',
      'gender',
      'address',
      'bloodGroup',
      'emergencyContact',
      'height',
      'weight',
      'allergies',
      'medications',
      'medicalHistory',
      'insuranceProvider',
      'insurancePolicyNumber',
      'status',
    ];

    updatableFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        patient[field] = req.body[field];
      }
    });

    patient = await patient.save();

    logger.info(`Patient updated: ${patient._id}`);

    res.status(200).json({
      success: true,
      message: 'Patient updated successfully',
      data: patient,
    });
  } catch (error) {
    logger.error(`Update patient error: ${error.message}`);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Delete patient
// @route DELETE /api/patients/:id
// @access Private/Admin
exports.deletePatient = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndDelete(req.params.id);

    if (!patient) {
      return res.status(404).json({ success: false, message: 'Patient not found' });
    }

    logger.info(`Patient deleted: ${req.params.id}`);

    res.status(200).json({
      success: true,
      message: 'Patient deleted successfully',
    });
  } catch (error) {
    logger.error(`Delete patient error: ${error.message}`);
    res.status(500).json({ success: false, message: error.message });
  }
};

    const patient = await Patient.create({
      user: req.user.userId,
      dateOfBirth,
      gender,
      bloodType,
      medicalHistory,
      allergies,
      emergencyContact,
    });

    res.status(201).json({ success: true, message: 'Patient created', patient });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Update patient
exports.updatePatient = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!patient) {
      return res.status(404).json({ success: false, message: 'Patient not found' });
    }

    res.json({ success: true, message: 'Patient updated', patient });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete patient
exports.deletePatient = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndDelete(req.params.id);
    if (!patient) {
      return res.status(404).json({ success: false, message: 'Patient not found' });
    }

    res.json({ success: true, message: 'Patient deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

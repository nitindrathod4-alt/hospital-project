const Doctor = require('../models/Doctor');
const User = require('../models/User');
const logger = require('../config/logger');

// @desc Get all doctors
// @route GET /api/doctors?page=1&limit=10&specialization=Cardiology
// @access Public
exports.getAllDoctors = async (req, res) => {
  try {
    const { page = 1, limit = 10, specialization, status } = req.query;
    const skip = (page - 1) * limit;

    let query = { status: 'active' };
    if (specialization) query.specialization = specialization;
    if (status) query.status = status;

    const total = await Doctor.countDocuments(query);
    const doctors = await Doctor.find(query)
      .populate('userId', 'firstName lastName email phone profileImage')
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: 'Doctors retrieved successfully',
      data: doctors,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        currentPage: parseInt(page),
        limit: parseInt(limit),
      },
    });
  } catch (error) {
    logger.error(`Get all doctors error: ${error.message}`);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Get single doctor
// @route GET /api/doctors/:id
// @access Public
exports.getSingleDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id).populate('userId');

    if (!doctor) {
      return res.status(404).json({ success: false, message: 'Doctor not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Doctor retrieved successfully',
      data: doctor,
    });
  } catch (error) {
    logger.error(`Get single doctor error: ${error.message}`);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Add doctor
// @route POST /api/doctors
// @access Private/Admin
exports.addDoctor = async (req, res) => {
  try {
    const {
      userId,
      specialization,
      licenseNumber,
      licenseExpiry,
      qualifications,
      experience,
      bio,
      consultationFee,
      availableDays,
    } = req.body;

    if (!userId || !specialization || !licenseNumber || !experience) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields',
      });
    }

    // Check if license number already exists
    const existingDoctor = await Doctor.findOne({ licenseNumber });
    if (existingDoctor) {
      return res.status(400).json({
        success: false,
        message: 'License number already registered',
      });
    }

    const doctor = await Doctor.create({
      userId,
      specialization,
      licenseNumber,
      licenseExpiry,
      qualifications,
      experience,
      bio,
      consultationFee,
      availableDays,
    });

    logger.info(`Doctor added: ${doctor._id}`);

    res.status(201).json({
      success: true,
      message: 'Doctor added successfully',
      data: doctor,
    });
  } catch (error) {
    logger.error(`Add doctor error: ${error.message}`);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Update doctor
// @route PUT /api/doctors/:id
// @access Private/Admin
exports.updateDoctor = async (req, res) => {
  try {
    let doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({ success: false, message: 'Doctor not found' });
    }

    const updatableFields = [
      'specialization',
      'qualifications',
      'experience',
      'bio',
      'consultationFee',
      'availableDays',
      'status',
      'maximumAppointmentsPerDay',
    ];

    updatableFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        doctor[field] = req.body[field];
      }
    });

    doctor = await doctor.save();

    logger.info(`Doctor updated: ${doctor._id}`);

    res.status(200).json({
      success: true,
      message: 'Doctor updated successfully',
      data: doctor,
    });
  } catch (error) {
    logger.error(`Update doctor error: ${error.message}`);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Delete doctor
// @route DELETE /api/doctors/:id
// @access Private/Admin
exports.deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);

    if (!doctor) {
      return res.status(404).json({ success: false, message: 'Doctor not found' });
    }

    logger.info(`Doctor deleted: ${req.params.id}`);

    res.status(200).json({
      success: true,
      message: 'Doctor deleted successfully',
    });
  } catch (error) {
    logger.error(`Delete doctor error: ${error.message}`);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Get doctor schedule
// @route GET /api/doctors/:id/schedule
// @access Public
exports.getDoctorSchedule = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id).select('availableDays consultationFee');

    if (!doctor) {
      return res.status(404).json({ success: false, message: 'Doctor not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Doctor schedule retrieved successfully',
      data: {
        availableDays: doctor.availableDays,
        consultationFee: doctor.consultationFee,
      },
    });
  } catch (error) {
    logger.error(`Get doctor schedule error: ${error.message}`);
    res.status(500).json({ success: false, message: error.message });
  }
};
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create doctor (admin only)
exports.createDoctor = async (req, res) => {
  try {
    const { userId, specialization, qualification, licenseNumber, experience, availableDays, availableHours } = req.body;

    const doctor = await Doctor.create({
      user: userId,
      specialization,
      qualification,
      licenseNumber,
      experience,
      availableDays,
      availableHours,
    });

    res.status(201).json({ success: true, message: 'Doctor created', doctor });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Update doctor
exports.updateDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doctor) {
      return res.status(404).json({ success: false, message: 'Doctor not found' });
    }

    res.json({ success: true, message: 'Doctor updated', doctor });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete doctor (admin only)
exports.deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!doctor) {
      return res.status(404).json({ success: false, message: 'Doctor not found' });
    }

    res.json({ success: true, message: 'Doctor deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');
const logger = require('../config/logger');

// @desc Book appointment
// @route POST /api/appointments
// @access Private
exports.bookAppointment = async (req, res) => {
  try {
    const { patientId, doctorId, appointmentDate, timeSlot, reason, appointmentType } = req.body;

    if (!patientId || !doctorId || !appointmentDate || !timeSlot || !reason) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ success: false, message: 'Doctor not found' });
    }

    // Check if slot is available
    const existingAppointment = await Appointment.findOne({
      doctorId,
      appointmentDate: new Date(appointmentDate),
      timeSlot,
      status: { $in: ['scheduled', 'confirmed'] },
    });

    if (existingAppointment) {
      return res.status(400).json({ success: false, message: 'This time slot is not available' });
    }

    const appointment = await Appointment.create({
      patientId,
      doctorId,
      appointmentDate,
      timeSlot,
      reason,
      appointmentType: appointmentType || 'in-person',
      consultationFee: doctor.consultationFee,
    });

    logger.info(`Appointment booked: ${appointment._id}`);

    res.status(201).json({
      success: true,
      message: 'Appointment booked successfully',
      data: appointment,
    });
  } catch (error) {
    logger.error(`Book appointment error: ${error.message}`);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Get patient appointments
// @route GET /api/appointments/patient/:patientId
// @access Private
exports.getPatientAppointments = async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const skip = (page - 1) * limit;

    let query = { patientId: req.params.patientId };
    if (status) query.status = status;

    const total = await Appointment.countDocuments(query);
    const appointments = await Appointment.find(query)
      .populate('doctorId', 'specialization consultationFee')
      .populate('patientId')
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ appointmentDate: -1 });

    res.status(200).json({
      success: true,
      message: 'Patient appointments retrieved successfully',
      data: appointments,
      pagination: { total, pages: Math.ceil(total / limit), currentPage: parseInt(page) },
    });
  } catch (error) {
    logger.error(`Get patient appointments error: ${error.message}`);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Get doctor appointments
// @route GET /api/appointments/doctor/:doctorId
// @access Private
exports.getDoctorAppointments = async (req, res) => {
  try {
    const { page = 1, limit = 10, date, status } = req.query;
    const skip = (page - 1) * limit;

    let query = { doctorId: req.params.doctorId };
    if (date) {
      const startDate = new Date(date);
      const endDate = new Date(date);
      endDate.setDate(endDate.getDate() + 1);
      query.appointmentDate = { $gte: startDate, $lt: endDate };
    }
    if (status) query.status = status;

    const total = await Appointment.countDocuments(query);
    const appointments = await Appointment.find(query)
      .populate('patientId', 'userId')
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ appointmentDate: 1 });

    res.status(200).json({
      success: true,
      message: 'Doctor appointments retrieved successfully',
      data: appointments,
      pagination: { total, pages: Math.ceil(total / limit), currentPage: parseInt(page) },
    });
  } catch (error) {
    logger.error(`Get doctor appointments error: ${error.message}`);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Cancel appointment
// @route PUT /api/appointments/:id/cancel
// @access Private
exports.cancelAppointment = async (req, res) => {
  try {
    const { cancellationReason, cancelledBy } = req.body;

    let appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }

    appointment.status = 'cancelled';
    appointment.cancellationReason = cancellationReason;
    appointment.cancelledBy = cancelledBy || 'patient';
    appointment.cancelledAt = new Date();

    appointment = await appointment.save();

    logger.info(`Appointment cancelled: ${appointment._id}`);

    res.status(200).json({
      success: true,
      message: 'Appointment cancelled successfully',
      data: appointment,
    });
  } catch (error) {
    logger.error(`Cancel appointment error: ${error.message}`);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Update appointment status
// @route PUT /api/appointments/:id/status
// @access Private/Doctor
exports.updateAppointmentStatus = async (req, res) => {
  try {
    const { status, diagnosis, treatment, followUpRequired, followUpDate } = req.body;

    let appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }

    appointment.status = status;
    if (diagnosis) appointment.diagnosis = diagnosis;
    if (treatment) appointment.treatment = treatment;
    if (followUpRequired !== undefined) appointment.followUpRequired = followUpRequired;
    if (followUpDate) appointment.followUpDate = followUpDate;

    appointment = await appointment.save();

    logger.info(`Appointment status updated: ${appointment._id} to ${status}`);

    res.status(200).json({
      success: true,
      message: 'Appointment status updated successfully',
      data: appointment,
    });
  } catch (error) {
    logger.error(`Update appointment status error: ${error.message}`);
    res.status(500).json({ success: false, message: error.message });
  }
};
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate('patient')
      .populate('doctor');

    if (!appointment) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }

    res.json({ success: true, appointment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create appointment
exports.createAppointment = async (req, res) => {
  try {
    const { patientId, doctorId, appointmentDate, timeSlot, reason, symptoms } = req.body;

    // Check if patient and doctor exist
    const patient = await Patient.findById(patientId);
    const doctor = await Doctor.findById(doctorId);

    if (!patient || !doctor) {
      return res.status(404).json({ success: false, message: 'Patient or Doctor not found' });
    }

    // Check for conflicting appointments
    const existingAppointment = await Appointment.findOne({
      doctor: doctorId,
      appointmentDate,
      timeSlot,
      status: { $in: ['scheduled', 'completed'] },
    });

    if (existingAppointment) {
      return res.status(400).json({ success: false, message: 'Time slot not available' });
    }

    const appointment = await Appointment.create({
      patient: patientId,
      doctor: doctorId,
      appointmentDate,
      timeSlot,
      reason,
      symptoms,
    });

    res.status(201).json({ success: true, message: 'Appointment created', appointment });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Update appointment
exports.updateAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!appointment) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }

    res.json({ success: true, message: 'Appointment updated', appointment });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Cancel appointment
exports.cancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status: 'cancelled' },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }

    res.json({ success: true, message: 'Appointment cancelled', appointment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get patient appointments
exports.getPatientAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ patient: req.params.patientId })
      .populate('doctor')
      .sort({ appointmentDate: -1 });

    res.json({ success: true, appointments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get doctor appointments
exports.getDoctorAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ doctor: req.params.doctorId })
      .populate('patient')
      .sort({ appointmentDate: -1 });

    res.json({ success: true, appointments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

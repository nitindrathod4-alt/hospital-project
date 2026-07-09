const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient',
      required: true,
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Doctor',
      required: true,
    },
    appointmentDate: {
      type: Date,
      required: [true, 'Appointment date is required'],
    },
    timeSlot: {
      type: String,
      required: [true, 'Time slot is required'],
      match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please provide a valid time format (HH:MM)'],
    },
    duration: {
      type: Number,
      default: 30,
      required: true,
    },
    reason: {
      type: String,
      required: [true, 'Reason for appointment is required'],
    },
    notes: String,
    status: {
      type: String,
      enum: ['scheduled', 'confirmed', 'completed', 'cancelled', 'no-show', 'rescheduled'],
      default: 'scheduled',
    },
    appointmentType: {
      type: String,
      enum: ['in-person', 'video', 'phone'],
      default: 'in-person',
    },
    consultationFee: {
      type: Number,
      required: true,
    },
    cancellationReason: String,
    cancelledAt: Date,
    cancelledBy: {
      type: String,
      enum: ['patient', 'doctor', 'system'],
    },
    diagnosis: String,
    treatment: String,
    followUpRequired: Boolean,
    followUpDate: Date,
  },
  { timestamps: true }
);

appointmentSchema.index({ patientId: 1, appointmentDate: -1 });
appointmentSchema.index({ doctorId: 1, appointmentDate: -1 });
appointmentSchema.index({ status: 1 });
appointmentSchema.index({ appointmentDate: 1 });

module.exports = mongoose.model('Appointment', appointmentSchema);

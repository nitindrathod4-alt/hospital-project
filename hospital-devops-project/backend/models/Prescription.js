const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema(
  {
    appointmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Appointment',
      required: true,
    },
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
    medications: [{
      medicineId: String,
      medicineName: {
        type: String,
        required: true,
      },
      dosage: {
        type: String,
        required: true,
      },
      frequency: {
        type: String,
        required: true,
      },
      duration: {
        type: String,
        required: true,
      },
      instructions: String,
      side_effects: String,
      quantity: Number,
    }],
    diagnosis: {
      type: String,
      required: true,
    },
    testRecommendations: [String],
    followUpDate: Date,
    notes: String,
    prescriptionDate: {
      type: Date,
      default: Date.now,
    },
    expiryDate: Date,
    status: {
      type: String,
      enum: ['active', 'expired', 'cancelled'],
      default: 'active',
    },
    issuedBy: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

prescriptionSchema.index({ patientId: 1, prescriptionDate: -1 });
prescriptionSchema.index({ doctorId: 1 });
prescriptionSchema.index({ appointmentId: 1 });

module.exports = mongoose.model('Prescription', prescriptionSchema);

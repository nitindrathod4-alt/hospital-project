const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    specialization: {
      type: String,
      required: [true, 'Specialization is required'],
      enum: ['Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics', 'Dermatology', 'Psychiatry', 'General Practice', 'ENT', 'Ophthalmology', 'Oncology'],
    },
    licenseNumber: {
      type: String,
      required: [true, 'License number is required'],
      unique: true,
    },
    licenseExpiry: {
      type: Date,
      required: true,
    },
    qualifications: [{
      degree: String,
      institution: String,
      yearOfCompletion: Number,
    }],
    experience: {
      type: Number,
      required: true,
      min: [0, 'Experience cannot be negative'],
    },
    bio: String,
    consultationFee: {
      type: Number,
      required: true,
      min: [0, 'Consultation fee cannot be negative'],
    },
    availableDays: [{
      day: { type: String, enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] },
      startTime: String,
      endTime: String,
    }],
    ratings: {
      averageRating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
      },
      totalReviews: {
        type: Number,
        default: 0,
      },
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'on-leave'],
      default: 'active',
    },
    maximumAppointmentsPerDay: {
      type: Number,
      default: 10,
    },
  },
  { timestamps: true }
);

doctorSchema.index({ userId: 1 });
doctorSchema.index({ specialization: 1 });
doctorSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Doctor', doctorSchema);

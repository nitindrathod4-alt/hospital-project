const mongoose = require('mongoose');

const billingSchema = new mongoose.Schema(
  {
    invoiceNumber: {
      type: String,
      unique: true,
      required: true,
    },
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient',
      required: true,
    },
    appointmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Appointment',
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Doctor',
    },
    items: [{
      description: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        default: 1,
      },
      unitPrice: {
        type: Number,
        required: true,
      },
      totalPrice: {
        type: Number,
        required: true,
      },
    }],
    subtotal: {
      type: Number,
      required: true,
    },
    tax: {
      type: Number,
      default: 0,
    },
    discount: {
      type: Number,
      default: 0,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ['credit_card', 'debit_card', 'cash', 'insurance', 'bank_transfer'],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'partially_paid', 'failed', 'refunded'],
      default: 'pending',
    },
    paidAmount: {
      type: Number,
      default: 0,
    },
    remainingAmount: {
      type: Number,
    },
    paymentDate: Date,
    dueDate: {
      type: Date,
      required: true,
    },
    insuranceClaim: {
      claimId: String,
      status: { type: String, enum: ['not_filed', 'filed', 'approved', 'rejected'] },
      amountCovered: Number,
    },
    notes: String,
    billingAddress: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String,
    },
  },
  { timestamps: true }
);

billingSchema.pre('save', function (next) {
  this.remainingAmount = this.totalAmount - this.paidAmount;
  next();
});

billingSchema.index({ patientId: 1, createdAt: -1 });
billingSchema.index({ invoiceNumber: 1 });
billingSchema.index({ paymentStatus: 1 });
billingSchema.index({ dueDate: 1 });

module.exports = mongoose.model('Billing', billingSchema);

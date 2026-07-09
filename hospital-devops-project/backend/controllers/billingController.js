const Billing = require('../models/Billing');
const logger = require('../config/logger');

// @desc Create billing
// @route POST /api/billing
// @access Private/Doctor/Admin
exports.createBilling = async (req, res) => {
  try {
    const { patientId, appointmentId, doctorId, items, paymentMethod, dueDate, billingAddress } = req.body;

    if (!patientId || !items || !paymentMethod) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    let subtotal = 0;
    items.forEach((item) => {
      subtotal += item.totalPrice;
    });

    const tax = subtotal * 0.1; // 10% tax
    const totalAmount = subtotal + tax;
    const invoiceNumber = `INV-${Date.now()}`;

    const billing = await Billing.create({
      invoiceNumber,
      patientId,
      appointmentId,
      doctorId,
      items,
      subtotal,
      tax,
      totalAmount,
      paymentMethod,
      dueDate,
      billingAddress,
    });

    logger.info(`Billing created: ${billing._id}`);

    res.status(201).json({
      success: true,
      message: 'Billing record created successfully',
      data: billing,
    });
  } catch (error) {
    logger.error(`Create billing error: ${error.message}`);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Get patient bills
// @route GET /api/billing/patient/:patientId
// @access Private
exports.getPatientBills = async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const skip = (page - 1) * limit;

    let query = { patientId: req.params.patientId };
    if (status) query.paymentStatus = status;

    const total = await Billing.countDocuments(query);
    const bills = await Billing.find(query)
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: 'Bills retrieved successfully',
      data: bills,
      pagination: { total, pages: Math.ceil(total / limit) },
    });
  } catch (error) {
    logger.error(`Get bills error: ${error.message}`);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Get single bill
// @route GET /api/billing/:id
// @access Private
exports.getBill = async (req, res) => {
  try {
    const bill = await Billing.findById(req.params.id).populate('patientId').populate('doctorId');

    if (!bill) {
      return res.status(404).json({ success: false, message: 'Bill not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Bill retrieved successfully',
      data: bill,
    });
  } catch (error) {
    logger.error(`Get bill error: ${error.message}`);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Process payment
// @route PUT /api/billing/:id/payment
// @access Private
exports.processPayment = async (req, res) => {
  try {
    const { paidAmount } = req.body;

    if (!paidAmount || paidAmount <= 0) {
      return res.status(400).json({ success: false, message: 'Please provide valid payment amount' });
    }

    let bill = await Billing.findById(req.params.id);

    if (!bill) {
      return res.status(404).json({ success: false, message: 'Bill not found' });
    }

    bill.paidAmount += paidAmount;

    if (bill.paidAmount >= bill.totalAmount) {
      bill.paymentStatus = 'paid';
      bill.paidAmount = bill.totalAmount;
    } else if (bill.paidAmount > 0) {
      bill.paymentStatus = 'partially_paid';
    }

    bill.paymentDate = new Date();
    bill = await bill.save();

    logger.info(`Payment processed for bill: ${bill._id} - Amount: ${paidAmount}`);

    res.status(200).json({
      success: true,
      message: 'Payment processed successfully',
      data: bill,
    });
  } catch (error) {
    logger.error(`Process payment error: ${error.message}`);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Get billing dashboard stats
// @route GET /api/billing/stats/dashboard
// @access Private/Admin
exports.getBillingStats = async (req, res) => {
  try {
    const totalBills = await Billing.countDocuments();
    const paidBills = await Billing.countDocuments({ paymentStatus: 'paid' });
    const pendingBills = await Billing.countDocuments({ paymentStatus: 'pending' });
    const totalRevenue = await Billing.aggregate([
      { $match: { paymentStatus: 'paid' } },
      { $group: { _id: null, total: { $sum: '$paidAmount' } } },
    ]);

    res.status(200).json({
      success: true,
      message: 'Billing stats retrieved successfully',
      data: {
        totalBills,
        paidBills,
        pendingBills,
        totalRevenue: totalRevenue[0]?.total || 0,
      },
    });
  } catch (error) {
    logger.error(`Get billing stats error: ${error.message}`);
    res.status(500).json({ success: false, message: error.message });
  }
};

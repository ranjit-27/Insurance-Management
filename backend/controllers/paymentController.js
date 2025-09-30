const express = require('express');
const router = express.Router();
const AuditLog= require('../models/AuditLog');
const Payment = require('../models/Payment');

const createPayment = async (req, res) => { 
    try {
        const { userId, userPolicyId, amount, method, reference } = req.body;

        // Validation
        if (!userId || !userPolicyId || !amount || !method || !reference) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingPayment = await Payment.findOne({ reference });
        if (existingPayment) {
            return res.status(400).json({ message: "Reference already exists" });
        }

        // Create payment
        const payment = new Payment({
            userId,
            userPolicyId,
            amount,
            method,
            reference
        });

        await payment.save();
        const newAuditLog = new AuditLog({
            action: 'Payment Created',
            actorId: userId,
            details: {
                paymentId: payment._id,
                reference: payment.reference
            },
            ip:req.ip,
            timestamp: new Date()
        });
        await newAuditLog.save();

        res.status(201).json({ message: "Payment created successfully", payment });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
const getAllPayments = async (req, res) => {
    try {
        if(req.user.role === 'customer'){
            const payments = await Payment.find({ userId: req.user._id });
            return res.status(200).json({ payments });
        }else if (req.user.role === 'admin') {
            const payments = await Payment.find();
            return res.status(200).json({ payments });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = { createPayment, getAllPayments };
const mongoose = require('mongoose');

const userPolicySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    policyProductId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PolicyProduct',
        required: true,
    },
    startDate: {
        type: Date, 
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    premiumPaid: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['active', 'expired', 'cancelled'],
        default: 'active',
    },
    assignedAgentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    nominee: {
        name: {
            type: String,
            required: true,
        },
        relation: {
            type: String,
            required: true,
        },
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });

module.exports = mongoose.model('UserPolicy', userPolicySchema);
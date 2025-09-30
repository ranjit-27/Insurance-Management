const PolicyProduct = require('../models/policyProduct');
const UserPolicy = require('../models/UserPolicy'); 
const Claim = require('../models/Claim');
const AuditLog=require('../models/AuditLog')
const purschasePolicy = async (req, res) => {  
    const { id } = req.params; 
    const userId = req.user._id;
    const { nominee } = req.body;
   
    try {
        const policy = await PolicyProduct.findById(id);
        if (!policy) {
            return res.status(404).json({ message: 'Policy not found.' });
        }

    
        const existingPurchase = await UserPolicy.findOne({ userId, policyProductId: id });
        if (existingPurchase) {
            return res.status(400).json({ message: 'You have already purchased this policy.' });
        }

        const userPolicy = await new UserPolicy({
            userId,
            policyProductId: id,
            startDate: new Date(), // Current date as the start date
            endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)), // 1-year policy
            premiumPaid: policy.premium, // Premium from the policy
            status: 'active',
            nominee: {
                name: nominee.name, 
                relation: nominee.relation, 
            },
        });
        await userPolicy.save();
        const newAuditLog = new AuditLog({
            action: 'Policy Purchased',
            actorId: req.user._id,
            details:{
                policyId: userPolicy._id,
                approvedBy: req.user._id,
            },
            ip: req.ip,
            timestamp: new Date()
        });
        await newAuditLog.save();
        res.status(201).json({ message: 'Policy purchased successfully.', userPolicy });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

const getPolicy = async (req, res) => {
    const userId = req.user._id; // User ID from authMiddleware

    try {
        const userPolicies = await UserPolicy.find({ userId }).populate('policyProductId');
        res.status(200).json({ policies: userPolicies });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

// Cancel a purchased policy
const cancelPolicy = async (req, res) => {
    const { id } = req.params; 
    const userId = req.user._id; 

    try {
        const userPolicy = await UserPolicy.findOne({ _id: id, userId });
        if (!userPolicy) {
            return res.status(404).json({ message: 'Policy not found or not associated with the user.' });
        }

        if (userPolicy.status === 'cancelled') {
            return res.status(400).json({ message: 'Policy is already cancelled.' });
        }

        userPolicy.status = 'cancelled';
        userPolicy.cancelDate = new Date();
        await userPolicy.save();
        const newAuditLog = new AuditLog({
            action: 'Policy Cancelled',
            actorId: userId,
            details:{
                policyId: userPolicy
            },      
            ip: req.ip,
            timestamp: new Date()
        });
        await newAuditLog.save();
        res.status(200).json({ message: 'Policy cancelled successfully.', userPolicy });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

const getPolicyById = async (req, res) => {
    const { id } = req.params; 
    const userId = req.user._id;    
    try {   
        const userPolicy = await UserPolicy.findOne({ _id: id, userId }).populate('policyProductId');
        if (!userPolicy) {
            return res.status(404).json({ message: 'Policy not found or not associated with the user.' });
        }       
        res.status(200).json({ policy: userPolicy });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};
module.exports = { purschasePolicy, getPolicy, cancelPolicy,getPolicyById };
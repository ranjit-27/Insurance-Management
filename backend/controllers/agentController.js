const expess=require('express');
const mongoose=require('mongoose');
const User=require('../models/User');
const UserPolicy=require('../models/UserPolicy');

const getAllCustomersWithPolicies = async (req, res) => {
    try {
        const agentId = req.user._id;

        
        const policies = await UserPolicy.find({ agentId }).populate('userId', '-password');

       
        const customersMap = new Map();

        policies.forEach(policy => {
            const user = policy.userId;
            if (!customersMap.has(user._id.toString())) {
                customersMap.set(user._id.toString(), {
                    customer: user,
                    policies: []
                });
            }
            customersMap.get(user._id.toString()).policies.push(policy);
        });

        
        const customersWithPolicies = Array.from(customersMap.values());

        res.status(200).json({ customers: customersWithPolicies });

    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};


const getCustomerWithPolicies = async (req, res) => {
    try {
        const agentId = req.user._id; 
        const customerId = req.params.id;

        
        const policies = await UserPolicy.find({ agentId, userId: customerId }).populate('userId', '-password');

        if (policies.length === 0) {
            return res.status(404).json({ message: 'Customer not found for this agent or has no policies.' });
        }

        const customer = policies[0].userId;

        res.status(200).json({
            customer,
            policies
        });

    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};



module.exports = { getAllCustomersWithPolicies, getCustomerWithPolicies };
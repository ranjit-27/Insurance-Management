const express = require('express');
const mongoose = require('mongoose');
const PolicyProduct = require('../models/policyProduct');
const User = require('../models/User');
const UserPolicy = require('../models/UserPolicy');
const Claim = require('../models/Claim');
const bcrypt = require('bcrypt');
const createAgent = async (req, res) => {
    const { name, email, password,role } = req.body;
    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Agent with this email already exists.' });
        }
        // Create agent
        const passwordHash = await bcrypt.hash(password, 10); // Hash password
        const agent = new User({
                   name,   
                   email,
                   password: passwordHash,
                   role
               });
        await agent.save();
        res.status(201).json({ message: 'Agent created successfully.', agent });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

// Get all agents
const getAllAgents = async (req, res) => {
    try {
        const agents = await User.find({ role: 'agent' }).select('-password');
        res.status(200).json({ agents });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};



const addPolicy = async (req, res) => {
    
    const { code, title, description, premium, termMonths, minSumInsured } = req.body;
    try {
        const existingPolicy = await PolicyProduct.findOne({ code });
        if (existingPolicy) {
            return res.status(400).json({ message: 'Policy with this code already exists.' });
        }
        const newPolicy = new PolicyProduct({
            code,
            title,
            description,
            premium,
            termMonths,
            minSumInsured,
        });
        await newPolicy.save();
        res.status(201).json({ message: 'Policy added successfully.', policy: newPolicy });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

const detailsPolicy = async (req, res) => {
    const { id } = req.params;

    try {
        const policy = await PolicyProduct.findById(id);
        if (!policy) {
            return res.status(404).json({ message: 'Policy not found.' });
        }

        res.status(200).json({ policy });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

const getPolicies = async (req, res) => {
    try {
        const policies = await PolicyProduct.find();
        res.status(200).json({ policies });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

// Delete a policy by ID
const deletePolicy = async (req, res) => {
    const { id } = req.params;

    try {
        const policy = await PolicyProduct.findByIdAndDelete(id);
        if (!policy) {
            return res.status(404).json({ message: 'Policy not found.' });
        }

        res.status(200).json({ message: 'Policy deleted successfully.', policy });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};   

// Update a policy by ID
const updatePolicy = async (req, res) => {
    const { id } = req.params;
    const { code, title, description, premium, termMonths, minSumInsured } = req.body;

    try {
        const updatedPolicy = await PolicyProduct.findByIdAndUpdate(
            id,
            { code, title, description, premium, termMonths, minSumInsured },
            { new: true, runValidators: true }
        );

        if (!updatedPolicy) {
            return res.status(404).json({ message: 'Policy not found.' });
        }

        res.status(200).json({ message: 'Policy updated successfully.', policy: updatedPolicy });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

const assignAgent = async (req, res) => {
    const { id } = req.params; // user policy ID
    const { agentId } = req.body;

    try {
        // Check if agent exists and is actually an agent
        const agent = await User.findOne({ _id: agentId, role: 'agent' });
        if (!agent) {
            return res.status(404).json({ message: 'Agent not found.' });
        }

        // Assign agent to the policy
        const updatedPolicy = await UserPolicy.findByIdAndUpdate(
            id,
            { assignedAgentId: agentId },
            { new: true }
        );

        if (!updatedPolicy) {
            return res.status(404).json({ message: 'User policy not found.' });
        }

        res.status(200).json({ message: 'Agent assigned successfully.', policy: updatedPolicy });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

const getUnassigned= async (req, res) => {
    try {
        const unassignedPolicies = await UserPolicy.find({ assignedAgentId: { $exists: false } }).populate('policyProductId userId');
        res.status(200).json({ unassignedPolicies });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }

};

// ...existing code...

// Get all customers
const getAllCustomers = async (req, res) => {
    try {
        const customers = await User.find({ role: 'customer' }).select('-password');
        res.status(200).json({ customers });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

const customerPolicies = async (req, res) => {
    const { id } = req.params; // user ID
    try {
        const policies = await UserPolicy.find({ userId: id }).populate('policyProductId');
        res.status(200).json({ policies });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

const agentPolicies = async (req, res) => {
    const { id } = req.params; // agent ID
    try {
        const policies = await UserPolicy.find({ assignedAgentId: id }).populate('policyProductId userId');
        res.status(200).json({ policies });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};


 

module.exports = { 
    addPolicy, 
    getPolicies, 
    deletePolicy, 
    updatePolicy,
    detailsPolicy,
    createAgent,
    getAllAgents,
    getUnassigned,
    assignAgent,
    getAllCustomers,    
    customerPolicies,  
    agentPolicies
};

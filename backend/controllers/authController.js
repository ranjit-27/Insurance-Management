const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const AuditLog=require('../models/AuditLog')
const dotenv = require('dotenv');
dotenv.config();
const register = async (req, res) => {
    const { name, email, password, role } = req.body;   
    try {
       
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }   
        const hashedPassword = await bcrypt.hash(password, 10); 
        const newUser = new User({
            name,   
            email,
            password: hashedPassword,
            role
        });
        const token = jwt.sign(
            { userId: newUser._id, role: newUser.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        await newUser.save(); 
        const newAuditLog = new AuditLog({
            action: 'User Registered',
            actorId: newUser._id,
            details:{
                email: newUser.email,
                role: newUser.role
            },
            ip: req.ip,
            timestamp: new Date()
        });
        await newAuditLog.save();
        res.status(201).json({ message: "Registered Successfully", token: token, user: newUser });
    } catch (error) {    
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;   
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User Not Found' });
        }
        // const password="1234567"
        // if(password!==user.password){
        //     return res.status(400).json({ message: 'Invalid Credentials' });
        // }
       const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }   
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        res.json({ token ,user});
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { register, login };
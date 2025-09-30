const expess=require('express');
const mongoose=require('mongoose');
const Claim=require('../models/Claim');
const UserPolicy=require('../models/UserPolicy');
const User=require('../models/User');   
const AuditLog=require('../models/AuditLog')

const claimPolicy = async (req, res) => {
    const userId = req.user._id;
   
    const { UserPolicyId, incidentDate, description, amountClaimed } = req.body;
    try {

        // Check if the user owns this policy
        const userPolicy = await UserPolicy.findOne({ _id: UserPolicyId});

        if (!userPolicy) {
            return res.status(404).json({ message: 'Policy not found or not associated with the user.' });
        }

        
        if(userPolicy.status !== 'active'){
            return res.status(400).json({message:'Only active policies can be claimed.'})
        }
        const claim = new Claim({
            userId,
            UserPolicyId: UserPolicyId,
            incidentDate,
            description,
            amountClaimed,
            assigndAgentId: userPolicy.assignedAgentId,
            status: 'pending'
        });

        await claim.save();

        
        const newAuditLog = new AuditLog({
            action: 'Claim Submitted',
            actorId: req.user._id,
            details:{
                claimId: claim._id,
                policyId: UserPolicy.UserPolicyId,
                approvedBy: req.user._id,
                assignedAgentId: UserPolicy.assignedAgentId || ' ',
                amountClaimed: claim.amountClaimed,
                role: req.user.role
            },
            ip: req.ip,
            timestamp: new Date()
        });
        await newAuditLog.save();
            
        res.status(201).json({ message: 'Claim submitted successfully.', claim });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

const getAllClaims = async (req, res) => {
    try {
        if (req.user.role === 'admin') {
      
            const claims = await Claim.find()
                .populate('userId', 'name email')
                .populate('UserPolicyId')
                .populate('decidedByAgentId', 'name email');
            return res.status(200).json({ claims });

        } else if (req.user.role === 'agent') {
            // Agent: get only claims assigned to this agent
            const agentId = req.user._id;
          
            const claims = await Claim.find({ assignedAgentId: agentId })
                .populate('userId', 'name email')
                .populate('UserPolicyId')
                .populate('decidedByAgentId', 'name email');
            return res.status(200).json({ claims });

        } else {
            // Normal user: get only their claims
            const userId = req.user._id;
         
                const claims = await Claim.find({ userId })
                .populate('userId', 'name email')
                .populate('UserPolicyId')
                .populate('decidedByAgentId', 'name email');
            return res.status(200).json({ claims });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};


const getClaim = async (req, res) => {
    const { id } = req.params;
    try {
        if(req.user.role==='customer'){
            const claimCheck=await Claim.findOne({_id:id,userId:req.user._id})
            if(!claimCheck){
                return res.status(403).json({message:'You are not authorized to view this claim'})
            }
            return res.status(200).json(claimCheck)
        }else if(req.user.role==='agent'){
            const claimCheck=await Claim.findOne({_id:id,assignedAgentId:req.user._id})
            if(!claimCheck){
                return res.status(403).json({message:'You are not authorized to view this claim'})
            }
            return res.status(200).json(claimCheck)
        }else{
            res.status(200).json(await Claim.findById(id))
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const updateClaimStatus = async (req, res) => {
    const { id } = req.params; 
    const { status, decisionNotes } = req.body;
    const agentId = req.user._id; 

 
    if (!['approved', 'rejected'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status. Use approved or rejected.' });
    }

    try {
        const claim = await Claim.findById(id);
        if (!claim) {
            return res.status(404).json({ message: 'Claim not found' });
        }

        claim.status = status;
        claim.decisionNotes = decisionNotes || '';
        claim.decidedByAgentId = agentId;

        await claim.save();
        const newAuditLog = new AuditLog({
            action: 'Policy status Updated',
            actorId: req.user._id,
            details:{
                claimId: claim._id,
                status: status,
                policyId: UserPolicy.policyId,
                assignedAgentId: UserPolicy.assignedAgentId || ' ',
                amountClaimed: claim.amountClaimed,
                approvedBy: agentId,
                role: req.user.role
            },
            ip: req.ip,
            timestamp: new Date()
        });
        await newAuditLog.save();
        res.status(200).json({ message: 'Claim status updated successfully', claim });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { claimPolicy,getAllClaims, getClaim, updateClaimStatus };
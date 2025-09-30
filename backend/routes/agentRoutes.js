const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const agentMiddleware = require('../middlewares/agentMiddleware');
const  UserPolicy  = require('../models/UserPolicy');
const  User  = require('../models/User');
const Claim = require('../models/Claim');
// 1) View customers who bought policies under this agent
router.get("/customers", authMiddleware, agentMiddleware, async (req, res) => {
    try {
        const agentId = req.user.id;
        const policies = await UserPolicy.find({ assignedAgentId: agentId }).populate('userId');
        const customerIds = [...new Set(policies.map(p => String(p.userId._id)) )];
        const customers = await User.find({ _id: { $in: customerIds }, role: 'customer' });
        res.status(200).json({ customers });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.put("/approvepolicy/:id", authMiddleware, agentMiddleware, async (req, res) => {
    try {
        const { status } = req.body;
        const agentId = req.user._id;  // safer than req.user.id

        // Find policy assigned to this agent
        const policy = await UserPolicy.findOne({
            _id: req.params.id,
            assignedAgentId: agentId
        });

        if (!policy) {
            return res.status(404).json({ message: "Policy not found or not assigned to you" });
        }

        policy.status = status;
        await policy.save();

        res.status(200).json({
            message: `Policy ${status} successfully`,
            policy
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// 3) Approve a claim (update status)
router.put("/approveclaim/:id", authMiddleware,async (req, res) => {
    try {
        const id=req.params.id;
        const { status, notes } = req.body;
        if (!['pending', 'approved', 'rejected'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }
        const claim = await Claim.findById(id);
        if (!claim) {
            return res.status(404).json({ message: 'Claim not found' });
        }
        claim.status = status;
        claim.decisionNotes = notes || '';
        claim.decidedByAgentId = req.user._id;
        await claim.save();
        res.status(200).json({ message: 'Claim status updated', claim });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// 4) List policies for a particular customer
router.get("/customer/:id/policies", authMiddleware, agentMiddleware, async (req, res) => {
    try {
   
        const agentId = req.user.id;
        const customerId = req.params.id;
        const policies = await UserPolicy.find({ userId: customerId, assignedAgentId: agentId }).populate('policyProductId');
        res.status(200).json({ policies });
        
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// View claims assigned to this agent
// View claims assigned to this agent
router.get("/claims", authMiddleware,(req,res,next)=>{
    if(req.user.role!=='agent'){
        return res.status(403).json({message:'Access denied. Agents only.'});
    }
    return next()
}, async (req, res) => {
    try {
        const agentId = req.user._id; 
        const claims = await Claim.find({ assigndAgentId: agentId })
            .populate("userId", "name email")
            .populate("UserPolicyId")
            .populate("decidedByAgentId", "name email");

        if (!claims || claims.length === 0) {
            return res.status(404).json({ message: "No claims found for this agent" });
        }

        res.status(200).json({ claims });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});


module.exports = router;

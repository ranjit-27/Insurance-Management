const User = require('../models/User');
const UserPolicy = require('../models/UserPolicy');
const Claim = require('../models/Claim');
const Payment = require('../models/Payment');
const AuditLog = require('../models/AuditLog');

const getAuditLogs = async (req, res) => {
    const limit = parseInt(req.query.limit) || 50; 

    try {
        const logs = await AuditLog.find()
            .populate('actorId', 'name email role')
            .sort({ createdAt: -1 })
            .limit(limit);

        res.status(200).json(logs);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching audit logs', error: error.message });
    }
};


const getSummary = async (req, res) => {
    try {
        const [usersCount, policiesCount, claimsPending, totalPayments,toatlClaims,totalAgents] = await Promise.all([
            User.countDocuments(),
            UserPolicy.countDocuments(),
            Claim.countDocuments({ status: 'pending' }),
            Payment.aggregate([{ $group: { _id: null, total: { $sum: "$amount" } } }]),
            Claim.countDocuments({ status: 'approved' }),
            User.countDocuments({ role: 'agent' })
        ]);

        res.status(200).json({
            users: usersCount,
            policiesSold: policiesCount,
            claimsPending: claimsPending,
            totalPayments: totalPayments.length ? totalPayments[0].total : 0,
            totalClaims:toatlClaims,
            totalAgnents:totalAgents,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error generating summary', error: error.message });
    }
};

module.exports = { getSummary,getAuditLogs };
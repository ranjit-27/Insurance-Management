const express = require('express');
const router = express.Router();
const { getAuditLogs,getSummary } = require('../controllers/auditLogController');
const  authMiddleware  = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

router.get('/admin/audit', authMiddleware, adminMiddleware, getAuditLogs);
router.get('/admin/summary', authMiddleware, adminMiddleware,getSummary);
 
module.exports = router;

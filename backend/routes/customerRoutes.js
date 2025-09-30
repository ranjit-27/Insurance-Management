const express = require('express');
const router = express.Router();
const { getPolicies, detailsPolicy } = require('../controllers/adminController');
const { purschasePolicy, getPolicy, cancelPolicy,getPolicyById } = require('../controllers/customerController');
const authMiddleware = require('../middlewares/authMiddleware');


router.get('/policies', authMiddleware, getPolicies);
router.get('/policies/:id', authMiddleware, detailsPolicy); 
router.post('/policies/:id/purchase', authMiddleware, purschasePolicy); 
router.get('/my/policies', authMiddleware, getPolicy);
router.get('/my/policies/:id', authMiddleware,getPolicyById);
router.put('/user/policies/:id/cancel', authMiddleware, cancelPolicy);
  

module.exports = router;
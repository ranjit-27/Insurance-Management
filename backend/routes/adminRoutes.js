const express = require('express');
const router = express.Router();
const authMiddleware=require('../middlewares/authMiddleware')
const adminMiddleware=require('../middlewares/adminMiddleware')
const {
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
    agentPolicies,
    customerPolicies,   
    }=require('../controllers/adminController')

router.post('/policy',authMiddleware,adminMiddleware,addPolicy)
router.get('/policies',authMiddleware,getPolicies)
router.get('/policy/:id',authMiddleware,detailsPolicy)
router.delete('/policy/:id',authMiddleware,adminMiddleware,deletePolicy)
router.patch('/policy/:id',authMiddleware,adminMiddleware,updatePolicy)




router.get('/customers',authMiddleware,adminMiddleware,getAllCustomers)
router.get('/customer/:id',authMiddleware,adminMiddleware,customerPolicies)



router.post('/agent',authMiddleware,adminMiddleware,createAgent)
router.get('/agents',authMiddleware,adminMiddleware,getAllAgents)
router.get('/agent/:id',authMiddleware,adminMiddleware,agentPolicies)
router.put('/agents/:id/assign',authMiddleware,adminMiddleware,assignAgent)
router.get('/policies/unassigned',authMiddleware,adminMiddleware,getUnassigned)

module.exports = router;

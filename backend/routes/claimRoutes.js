const express = require('express');
const router = express.Router();
const { getAllClaims, getClaim, updateClaimStatus,claimPolicy} = require('../controllers/claimController');
const authMiddleware=require('../middlewares/authMiddleware')



router.post('/claims',authMiddleware,(req,res,next)=>{
    if(req.user.role==='customer'){
        return next()
    }else{
        return res.status(403).json({message:'Only customers can policy claims'})
    }
}, claimPolicy);
router.get('/claims', authMiddleware,getAllClaims);
router.get('/claims/:id', authMiddleware,getClaim);  
router.put('/claims/:id/status', authMiddleware,(req,res,next)=>{
    if(req.user.role==='admin' || req.user.role==='agent'){
        next()
    }else{
        return res.status(403).json({message:'Only admin or agent can update claim status'})
    }
}, updateClaimStatus);
module.exports = router; 
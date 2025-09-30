const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');
const {createPayment, getAllPayments}=require('../controllers/paymentController');

const router = express.Router();
router.post('/payments',authMiddleware,(req,res,next)=>{
    if(req.user.role==='customer'){
        return next()
    }else{
        return res.status(403).json({message:'Only customers can create payments'})
    }
},createPayment)
router.get('/payments',authMiddleware,(req,res,next)=>{
    if(req.user.role==='customer' || req.user.role==='admin'){
        return next()
    }
    else{
        return res.status(403).json({message:'Only customers and admins can view payments'})
    }
},getAllPayments)
module.exports = router;
const mongoose=require('mongoose')
const { create } = require('./User')
const paymentSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    userPolicyId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'UserPolicy',
        required:true
    },
    amount:{
        type:Number,
        required:true 
    },
    method:{
        type:String,
        enum:['card','netbanking','offline','simulated'],
        required:true
    },
    reference:{
        type:String,
        required:true,
        unique:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
},{ timestamps:true })

module.exports=mongoose.model('Payment',paymentSchema)


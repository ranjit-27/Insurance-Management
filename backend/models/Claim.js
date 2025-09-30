const mongoose=require('mongoose')
const UserPolicy = require('./UserPolicy')
const claimSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    UserPolicyId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'UserPolicy',
        required:true 
    },
    incidentDate:{
        type:Date,
        required:true   
    },
    description:{
        type:String,    
        required:true
    },
    amountClaimed:{
        type:Number,
        required:true   
    },
    assigndAgentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    status:{
        type:String,
        enum:['pending','approved','rejected'],
        default:'pending'
    },
    desicionNotes:{
        type:String
    },
    decidedByAgentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
},{ timestamps:true })

module.exports=mongoose.model('Claim',claimSchema)
const mongoose=require('mongoose')
const policyProductSchema=mongoose.Schema({
    code:{      
        type:String,
        required:true,
        unique:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true   
    },
    premium:{
        type:Number,
        required:true
    },
    termMonths:{
        type:Number,
        required:true
    },
    minSumInsured:{ 
        type:Number,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
},{ timestamps:true })

module.exports=mongoose.model('PolicyProduct',policyProductSchema)  
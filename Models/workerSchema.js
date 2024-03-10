const mongoose = require('mongoose')



const workerSchema = new mongoose.Schema({
     
    name:{
        type:String,
        required:true
     },
     email:{
        type:String,
        required:true
     },
     mobileno:{
        type:Number,
        required:true
     },
     photo:{
        type:String,
        required:true
     },
     district:{
        type:String,
        required:true
     },
     worktype:{
        type:String,
        required:true
     },
     description:{
      type:String,
      required:true
     },
     certificate:{
        type:String,
        required:true
     },
     password:{
        type:String,
        required:true
     },
     status:{
      type:Boolean,
      required:true
   }
})


const workers = mongoose.model("workers",workerSchema)

module.exports = workers
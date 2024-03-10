const mongoose = require('mongoose')



const BookingSchema = new mongoose.Schema({
     date:{
        type:String,
        required:true
     },
     service:{
        type:String,
        required:true
     },
     location:{
        type:String,
        required:true
     },
     locationURL:{
      type:String,
      required:true
     },
     userid:{
        type:String,
        required:true
     },
     workerid:{
        type:String,
        required:true
     },
     review:{
        type:String
     },
     status:{
        type:Boolean
     }
})


const bookings = mongoose.model("bookings",BookingSchema)

module.exports = bookings
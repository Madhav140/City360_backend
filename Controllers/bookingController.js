const bookings = require('../Models/BookingSchema')

exports.bookingRegister = async(req,res)=>{

    const {date,service,location,locationURL} = req.body
    const {id} = req.params
    const userid = req.payload
    try {
            const newBooking = new bookings({
                date,service,location,locationURL,userid,workerid:id,review:'',status:null
            })
            await newBooking.save()
            res.status(200).json(newBooking)
        
        
    } catch (error) {
        res.status(401).json(`Booking failed due to ${error}`)
    }

}


exports.bookingReview = async(req,res)=>{
    const {id,feedback} = req.body
   
    try {
        const reviewWorkers = await bookings.updateOne({_id:id},{$set:{review:feedback}})
        res.status(200).json(reviewWorkers)
       } catch (err) {
        res.status(401).json(`Request failed due to ${err}`)
       }

}

exports.deleteReview = async(req,res)=>{
    const {id} = req.params
   
    try {
        const delreview = await bookings.findByIdAndDelete({_id:id})
        res.status(200).json(delreview)
       } catch (err) {
        res.status(401).json(`Request failed due to ${err}`)
       }

}



exports.bookingstatus = async(req,res)=>{
  const {id} = req.params
  if({truestatus} = req.body){
    var stat = true
  }
  
   if({falsestatus}  = req.body){
    var stat = false
  }
 
    try {
        const trueworkers = await bookings.updateOne({_id:id},{$set:{status:stat}})
        res.status(200).json(trueworkers)
       } catch (err) {
        res.status(401).json(`Request failed due to ${err}`)
       }
}






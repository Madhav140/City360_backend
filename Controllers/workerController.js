const workers = require('../Models/workerSchema')
const jwt = require('jsonwebtoken')

exports.workerRegister = async(req,res)=>{

    const {name,email,mobileno,district,worktype,description,password} = req.body
    const image = req.files[0].filename
    const cert = req.files[1].filename
    try {
        const existworker = await workers.findOne({email})
        if(existworker){
            res.status(406).json('Account already exist...Please Login')
        }
        else{
            const newWorker = new workers({
                name,email,mobileno,photo:image,district,worktype,description,certificate:cert,password,status:false
            })
            await newWorker.save()
            res.status(200).json(newWorker)
        }
        
    } catch (error) {
        res.status(401).json(`Registration failed due to ${error}`)
    }

}


//login request
exports.workerLogin = async(req,res)=>{
    const {email,pswd} = req.body
  
   try{ 
    const existworker = await workers.findOne({email,password:pswd})
  
    if(existworker){
      const token = jwt.sign({userid:existworker._id},"secretkey")
      res.status(200).json({existworker,token})
    }
    else{
  res.status(404).json('Invalid email or password')
    }}catch(err){
      res.status(401).json(`login failed due to ${err}`)
    }
  }

//get false worker for admin
  exports.getAdminWorkers = async(req,res)=>{
     try {
      const adminWorkers = await workers.find({status:false})
      res.status(200).json(adminWorkers)
     } catch (err) {
      res.status(401).json(`Request failed due to ${err}`)
     }
  }


  //set true for workers
  exports.approveWorkers = async(req,res)=>{
    const {id} = req.params
    try {
     const adminWorkers = await workers.updateOne({_id:id},{$set:{status:true}})
     res.status(200).json(adminWorkers)
    } catch (err) {
     res.status(401).json(`Request failed due to ${err}`)
    }
 }


//get approved worker for admin
 exports.getApprovedWorkers = async(req,res)=>{
  try {
   const adminWorkers = await workers.find({status:true})
   res.status(200).json(adminWorkers)
  } catch (err) {
   res.status(401).json(`Request failed due to ${err}`)
  }
}


//delete worker
exports.deleteWorker = async(req,res)=>{
  const {id} = req.params
  try {
      const removeWorker = await workers.findByIdAndDelete({_id:id})
      res.status(200).json(removeWorker)
  } catch (error) {
      res.status(401).json(error)
  }
}


//get all worker for admin
exports.getAllWorkers = async(req,res)=>{
  try {
   const allWorkers = await workers.find()
   res.status(200).json(allWorkers)
  } catch (err) {
   res.status(401).json(`Request failed due to ${err}`)
  }
}


exports.getBookedworkers = async(req,res)=>{
  try {
      const bookWorkers = await workers.aggregate([ {
        $addFields: {
          workerIdString: { $toString: "$_id" } 
        }
      },{$lookup:{from:"bookings",localField:"workerIdString",foreignField:"workerid",as:"bookedworkers"}}])
      res.status(200).json(bookWorkers)
     } catch (err) {
      res.status(401).json(`Request failed due to ${err}`)
     }
}


exports.editWorker = async(req,res)=>{
  const {id} = req.params
  const {name,email,mobileno,district,worktype,description,password,photo,certificate,status} = req.body
  const uploadedimage = req.file?req.file.filename:photo

  try {
      const updateWorker = await workers.findByIdAndUpdate({_id:id},{name,email,mobileno,photo:uploadedimage,district,worktype,description,certificate,password,status
      },{new:true})

      await updateWorker.save()
      res.status(200).json(updateWorker)
  } catch (error) {
      res.status(401).json(error)
  }
}
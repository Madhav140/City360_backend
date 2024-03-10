const users  = require('../Models/usersSchema')
const jwt = require('jsonwebtoken')

exports.userRegister = async(req,res)=>{

    const {uname,email,mobile,pswd} = req.body

    try {
        const existuser = await users.findOne({email})
        if(existuser){
            res.status(406).json('Account already exist...Please Login')
        }
        else{
            const newUsers = new users({
                username:uname,email,mobileno:mobile,password:pswd
            })
            await newUsers.save()
            res.status(200).json(newUsers)
        }
        
    } catch (error) {
        res.status(401).json(`Registration failed due to ${error}`)
    }

}


//login request
exports.userLogin = async(req,res)=>{
    const {email,pswd} = req.body
  
   try{ 
    const existuser = await users.findOne({email,password:pswd})
  
    if(existuser){
        const token = jwt.sign({userid:existuser._id},"secretkey")
      res.status(200).json({existuser,token})
    }
    else{
  res.status(404).json('Invalid email or password')
    }}catch(err){
      res.status(401).json(`login failed due to ${err}`)
    }
  }


  //Admin login request
exports.adminLogin = async(req,res)=>{
  const {email,pswd} = req.body

 try{ 
  const admin = await users.findOne({Adminemail:email,Adminpswd:pswd})

  if(admin){
    const token = jwt.sign({userid:admin._id},"secretkey")
    res.status(200).json({admin,token})
  }
  else{
   res.status(404).json('Invalid email or password')
  }}catch(err){
    res.status(401).json(`login failed due to ${err}`)
  }
}


//get all users for admin
exports.getAllUsers = async(req,res)=>{
  try {
   const allUsers = await users.find()
   res.status(200).json(allUsers)
  } catch (err) {
   res.status(401).json(`Request failed due to ${err}`)
  }
}

exports.getBookedusers = async(req,res)=>{
  try {
      const bookuser = await users.aggregate([ {
        $addFields: {
          userIdString: { $toString: "$_id" } 
        }
      },{$lookup:{from:"bookings",localField:"userIdString",foreignField:"userid",as:"bookedusers"}}])
      res.status(200).json(bookuser)
     } catch (err) {
      res.status(401).json(`Request failed due to ${err}`)
     }
}



exports.userPassword = async(req,res)=>{
  const {uname,email,pswd} = req.body
 
  try {
      const pswdChange = await users.updateOne({username:uname,email},{$set:{password:pswd}})
      res.status(200).json(pswdChange)
     } catch (err) {
      res.status(401).json(`Request failed due to ${err}`)
     }

}
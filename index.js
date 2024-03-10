
require('dotenv').config()
require('./DB/connection')

const express = require('express')
const cors = require('cors')
const router = require("./Router/routers")



const CityServer = express()

CityServer.use(cors())

CityServer.use(express.json())

CityServer.use(router)

CityServer.use('/uploads',express.static('./uploads'))




const port = 4000 || process.env

CityServer.listen(port,()=>{
    console.log('Server running Sucessfully');
})

CityServer.get('/',(req,res)=>{
    res.send(`<h2 style="color:green" >CityServer running Successfully`)
})





















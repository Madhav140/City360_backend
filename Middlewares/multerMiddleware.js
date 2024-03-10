//import multer
const multer = require('multer')

//disk storage is used to create storage space
const storage = multer.diskStorage({
    //destination  - location in which the file is stored
    destination:(req,file,callback)=>{
        callback(null,'./uploads')
    },
    //filename - the name in which the file is stored
    filename:(req,file,callback)=>{
        //date.nov will give uploaded time and we get the file name from the key originalname in the result object
        const filename = `image-${Date.now()}-${file.originalname}`
        callback(null,filename)
    }
})


const fileFilter = (req,file,callback) =>{
    if(file.mimetype==='image/png' || file.mimetype==='image/jpg' || file.mimetype==='image/jpeg' || file.mimetype==='application/pdf'){
        callback(null,true)
    }
    else{
        callback(null,false)
        return callback(new Error('only png,jpg and jpeg are allowed'))
    }
}


//create multerconfiguration
const multerConfig = multer({
    storage,
    fileFilter
})

//export multer
module.exports = multerConfig
const express  = require('express') 

const userController = require('../Controllers/userController')
const workerController = require('../Controllers/workerController')
const Bookingcontroller = require('../Controllers/bookingController')
const multerConfig = require('../Middlewares/multerMiddleware')
const jwtConfig = require('../Middlewares/jwtMiddleware')

const router = new express.Router()


//users path
router.post('/user/register',userController.userRegister)
router.post('/user/login',userController.userLogin)
router.get('/admin/allUsers',jwtConfig,userController.getAllUsers)
router.post('/user/booking/:id',jwtConfig,Bookingcontroller.bookingRegister)
router.get('/user/bookedworkers',jwtConfig,workerController.getBookedworkers)
router.post('/user/review',jwtConfig,Bookingcontroller.bookingReview)
router.delete('/user/delete/:id',jwtConfig,Bookingcontroller.deleteReview)
router.put('/user/password',userController.userPassword)


//workers path
router.post('/worker/register',multerConfig.any([{name:'photo',maxCount:1},{name:'certificate',maxCount:1}]),workerController.workerRegister)
router.post('/worker/login',workerController.workerLogin)
router.put('/worker/update/:id',jwtConfig,multerConfig.single('photo'),workerController.editWorker)
router.get('/worker/bookedusers',jwtConfig,userController.getBookedusers)
router.put('/worker/approve/:id',jwtConfig,Bookingcontroller.bookingstatus)



//Admin path
router.post('/admin/login',userController.adminLogin)
router.get('/admin/workers',jwtConfig,workerController.getAdminWorkers)
router.put('/admin/workApprove/:id',jwtConfig,workerController.approveWorkers)
router.get('/admin/approvedworkers',jwtConfig,workerController.getApprovedWorkers)
router.delete('/admin/delete/:id',jwtConfig,workerController.deleteWorker)
router.get('/admin/allWorkers',jwtConfig,workerController.getAllWorkers)










module.exports = router


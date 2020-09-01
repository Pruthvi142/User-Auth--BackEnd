const router=require('express').Router()
const userCltr=require('../app/controllers/usersControllers')
const authenticateUser=require('../app/middlewares/authenticateuser')
router.post('/api/users/register',userCltr.register)
router.get('/api/users/login',userCltr.login)
router.get('/api/users/account',authenticateUser,userCltr.account)

module.exports=router

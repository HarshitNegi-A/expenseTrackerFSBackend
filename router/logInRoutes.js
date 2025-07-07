const express=require('express')
const router=express.Router()
const logInController=require('../controller/logInController')

router.post('/',logInController.login)

module.exports=router
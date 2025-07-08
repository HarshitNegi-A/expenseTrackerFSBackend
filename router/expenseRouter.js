const express=require('express')
const router=express.Router()
const expenseController=require('../controller/expenseController')

router.get('/',expenseController.getExpense)
router.post('/',expenseController.addExpense)

module.exports=router
const express=require('express')
const router=express.Router()
const expenseController=require('../controller/expenseController')
const authenticate=require('../middleware/auth')

router.get('/',authenticate,expenseController.getExpense)
router.post('/',authenticate,expenseController.addExpense)
router.delete('/:id',authenticate,expenseController.deleteExpense)

module.exports=router
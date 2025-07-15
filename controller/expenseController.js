const db=require('../db')
const Expense=require('../models/expenseModel')

exports.addExpense=async (req,res)=>{
    try{
        const {amount,description,category}=req.body
    // db.query('INSERT INTO expenses (amount,description,category) VALUES (?,?,?)',[amout,description,category],(err,result)=>{
    //     if(err) return res.status(500).json({message:'Insert error'});
    //     res.status(201).json({message:'Expense Added'})
    // })


    const expense=await Expense.create({
        amount:amount,
        description:description,
        category:category,
        UserId: req.user.id 
    })
    res.status(201).json({message:'Expense Created'})
    }
    catch(err){
        console.error("Expense creation error:", err); 
  res.status(500).json({ message: 'Unable to make entry' });
    }
    
}

exports.getExpense=async(req,res)=>{
    // db.query('SELECT * from expenses',(err,results)=>{
    //     if(err) return res.status(500).json({message:'Fetch Error'});
    //     res.status(200).json(results)
    // })
    console.log("req.user =", req.user);
    try{
    const expenses=await Expense.findAll({where:{UserId:req.user.id}})
    if(!expenses){
            res.status(404).json({message:'Expenses is not found'})
        }
    res.status(200).json(expenses)
    }
    catch(err){
        console.log(err)
    }
    
}

exports.deleteExpense=async (req,res)=>{
    try{
        const {id}=req.params
        const expense=await Expense.destroy({
            where:{
                id:id
            }
        })
        if(!expense){
            res.status(404).json({message:'Expense is not found'})
        }
        res.status(200).json({message:'Expense is deleted'})
    }
    catch(err){
        console.log(err)
        res.status(500).json({message:'Error encountered while deleting'})
    }
    
    // db.query('DELETE from expenses WHERE id=?',[id],(err,result)=>{
    //     if(err) return res.status(500).json({message:'Expenses delete error'});
    //      if (result.affectedRows === 0) {
    //   return res.status(404).json({ message: 'Expense not found' });
    // }
    //     res.status(201).json({message:'Expense Deleted'})
    // })
}
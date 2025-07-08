const db=require('../db')

exports.addExpense=(req,res)=>{
    const {amout,description,category}=req.body
    db.query('INSERT INTO expenses (amount,description,category) VALUES (?,?,?)',[amout,description,category],(err,result)=>{
        if(err) return res.status(500).json({message:'Insert error'});
        res.status(201).json({message:'Expense Added'})
    })
}

exports.getExpense=(req,res)=>{
    db.query('SELECT * from expenses',(err,results)=>{
        if(err) return res.status(500).json({message:'Fetch Error'});
        res.status(200).json(results)
    })
}
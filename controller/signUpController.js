exports.signup=(req,res)=>{
    const {name,email,password}=req.body
    console.log("Received:", name, email, password)
    res.status(200).json({ message: "Signup successful!" })
}
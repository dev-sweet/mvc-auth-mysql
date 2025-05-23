const db = require('../config/db');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register user
exports.createUser = async(req,res)=>{
  const {userName,password} = req.body;
  if(!userName || !password){
    return res.status(400).json({message:"Email and Password is required!"}) 
  }

 try{
    const hashedPassword = await bcrypt.hash(password,15);
     const sql = 'INSERT INTO users (userName, password) VALUES (?, ?)';
     db.query(sql,[userName,hashedPassword], (err, result) => {
       if(err){
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(400).json({ message: "This user already exists" });
        }
        return res.status(500).json({message:err.message})
       }
      res.status(201).json({ message: "User created successfully!", userId: result.insertId });
    });
 }
 catch(err){
    res.status(500).json({message:err.message});
 }
}

// Login user
exports.loginUser = (req,res)=>{
    const {userName,password} = req.body;
    if(!userName || !password){
       return res.status(400).json({ message:"Email and password is required!" })
    }

    // find user by user name
    const sql = 'SELECT * FROM users WHERE userName= ?';
    db.query(sql,[userName],async(err,result)=>{
        if(err){
           return res.status(500).json({message:err.message})
        }
        if(result.length <= 0){
            return res.status(400).json({message:'Invalid username or password!'})
        }

        const user = result[0];
        const matchPassword = await bcrypt.compare(password,user.password);
        console.log(matchPassword);
        if(!matchPassword){
            return res.status(400).josn({message:"Invalid Password!"})
        }

        const token = jwt.sign({username:user.username},process.env.SECRET, { expiresIn: '1h' });
        console.log(token) 
        res.status(200).json({message:"Loggin success!",token:`Bearer ${token}`})
    })
}
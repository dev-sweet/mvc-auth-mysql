const express = require("express");

// dotenv config
require('dotenv').config();
const authRouter = require('./routes/authRoutes');
const app = express();
const PORT = process.env.PORT || 3000


// middlewears
app.use(express.json());

// routes
app.use(authRouter)

// home route
app.get('/',(req,res)=>{
    res.send('Hello world!');
})
// not found
app.use((req,res,next)=>{
    res.status(404).json({message:"404 Not Found"})
})

app.listen(PORT,()=>{
    console.log(`Server is started at PORT: ${PORT}`)
})
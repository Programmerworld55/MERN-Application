const express=require('express');
const mongoose=require('mongoose')
const UserModel=require('./Models/user_model')
const app=express()
const dotenv=require("dotenv")
dotenv.config()
const UserRouter=require('./UserRoute')
const cors=require('cors')

//..............................extra
mongoose.connect((process.env.URI)).then(()=>{
    console.log("connected to Database successfully")
}).catch((error)=>{
    console.log("error occur while connecting to database : ",error)
})
// ..............................
app.use(express.json())
app.use(cors());


// ...................................
app.listen(process.env.PORT || 3000,(error)=>{
    if(error) console.log("error occur while starting server : ",error)
        console.log("server is on : ",process.env.PORT)
})

// app.use(UserRouter)
app.use('/api', UserRouter)
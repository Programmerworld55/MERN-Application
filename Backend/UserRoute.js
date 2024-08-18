const express=require('express');
const mongoose=require('mongoose')
const UserModel=require('./Models/user_model')
const router=express.Router()



// const app=express()

router.get('/', async (req, res)=>
    {
        // res.send("Hello World")
try
   {
    const UserStoredData=await UserModel.find()
    res.status(200).json(UserStoredData)

   }
   catch(error){
    console.log("error occur while reading data from database")
    res.status(500).json({error:error.message})
   }

})

// ...............................
router.post("/",async (req,res)=>{
   const {name,email,age}=req.body
   try
   {
    const UserData=await UserModel.create({
        name:name,
        email:email,
        age:age,

       })
       res.status(201).json(UserData)
   }
   catch(error){
    console.log("error occur while writing data to database")
    res.status(400).json({error:error.message})
   }
})

router.get('/:id', async (req, res)=>
    {
        // res.send("Hello World")
try
   {
    const {id}=req.params
    const SingleUser=await UserModel.findById(id)
    res.status(200).json(SingleUser)

   }
   catch(error){
    console.log("error occur while reading data from database")
    res.status(500).json({error:error.message})
   }

})
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const SingleUser = await UserModel.findByIdAndDelete(id);
        if (!SingleUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(SingleUser);
    } catch (error) {
        console.error("Error occurred while deleting data from database:", error);
        res.status(500).json({ error: error.message });
    }
});
router.patch('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const {name,email,age}=req.body
        const UpdateUser = await UserModel.findByIdAndUpdate(id,req.body,{new:true});
        if (!UpdateUser) {
            return res.status(404).json({ message: "User not updated" });
        }
        res.status(200).json(UpdateUser);
    } catch (error) {
        console.error("Error occurred while Updating user:", error);
        res.status(500).json({ error: error.message });
    }
});



module.exports=router


// http://localhost:5500/66c0888b820a09d74280c341    
// api calllll
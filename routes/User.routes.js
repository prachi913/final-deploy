const {Router}=require('express');
const { UserModel } = require('../model/User.model');
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')

const userRouter=Router();

userRouter.get('/',(req,res)=>{
    res.send("Welcome to Microsoft Users DB")
})

userRouter.post('/register',async(req,res)=>{
    const {email,pass,name,age}=req.body
    try {
        bcrypt.hash(pass,5,async(err,hash)=>{
            const user =new UserModel({email,name,age,pass:hash})
            await user.save() 
            res.status(200).send({"msg":"New user has been registered"})
        });
    } catch (error) {
        res.status(400).send({"err":error.message})
    }
})

userRouter.post('/login',async(req,res)=>{
    const {email,pass}=req.body
    try {
        const user=await UserModel.findOne({email})
        // console.log(user);
        if(user){
            bcrypt.compare(pass,user.pass,(err,result)=>{
                if(result){
                    const token=jwt.sign({author:user.name, authorID:user._id},'masai');
                    res.status(200).send({"msg":"Login Successfull!!","token":token,"user":user})
                }else{
                    res.status(200).send({"err":"Wrong Credentials"})
                }
            });
        }else{
            res.status(200).send({"err":"User not found!"})
        }        
    } catch (error) {
        res.status(400).send({"err":error.message})
    }
})

module.exports=userRouter
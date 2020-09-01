const Users=require("../models/Users")
// const { json } = require("body-parser")
const jwt=require('jsonwebtoken')
const bycrypt=require('bcryptjs')
const userCltr={}
require('dotenv').config()
userCltr.register=(req,res)=>{
    const body=req.body
    const user=new Users(body)
     user.save()
       .then((user)=>{
           res.json(user)
       })
       .catch((err)=>{
           res.json(err)
       })

}
userCltr.login=(req,res)=>{
     const body=req.body
      Users.findOne({email:body.email})
         .then((user)=>{
             if(user)
             {
                 bycrypt.compare(body.password,user.password)
                  .then((result)=>{
                       if(result)
                       {
                            const formData={
                                id:user._id
                            }
                         const token= jwt.sign(formData,'process.env.secret-key',{expiresIn:"1d"})
                            res.json({token:token})
                       }
                       else
                       {
                           res.json("invalid email or password")
                       }
                  })
              
             }
             else{
                 res.json({message:"invalid email or password"})
             }
         })
         .catch((err)=>{
             res.json(err)
         })

}
userCltr.account=(req,res)=>{
    console.log("user",req.user)
    res.json(req.user)

}
module.exports=userCltr

const {Schema,model}=require('mongoose')
const { default: validator } = require('validator')
const isEmail=require('validator/lib/isEmail')
const bcrypt=require('bcryptjs')
const { timeStamp } = require('console')
const userSchema= new Schema({
         username:{
             type:String,
             required:true

         },
         email:{
             type:String,
             required:true,
             unique:true,
             validate:{
                 validator:function(value){

                     return isEmail(value)  
                 },
                 message:function(){
                         return "invalid email or password"
                 }
             }
             
         },
         password:{
             type:String,
             required:true
         }
},{timeStamps:true})

userSchema.pre('save',function(next){
   const user=this
   bcrypt.genSalt()
    .then((result)=>{
          bcrypt.hash(user.password,result)
              .then((encrypted)=>{
                  user.password=encrypted
                  next()
              })
            
    })
})
const Users=model('User',userSchema)
module.exports=Users
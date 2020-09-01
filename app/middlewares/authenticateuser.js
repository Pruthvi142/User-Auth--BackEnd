const jwt=require('jsonwebtoken')
const Users = require('../models/Users')
require('dotenv').config()

const authenticateUser=(req,res,next)=>{
   
     const token=req.headers.authorization
      if(token)
      {
           const formData=jwt.verify(token,'process.env.secret-key')
           console.log("form",formData)
         
                try
                {
                    Users.findById(formData.id)
                       .then((user)=>{
                           console.log("auth",user)
                           req.user=user
                           next()
                       })
                }
                catch(e)
                {
                   res.json( res.status('401').json({ error: e.message }))
                }
      }
      else{
          res.json({erros:"token must be provide"})
      }
}
module.exports=authenticateUser
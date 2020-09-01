const mongoose=require('mongoose')
const configureDb=()=>{

    mongoose.connect('mongodb://localhost:27017/users-auth2',{useNewUrlParser:true,useUnifiedTopology: true })
    .then(()=>{
        console.log("db conneted")
    })
    .catch((err)=>{
        console.log(err)
    })
   
}

module.exports=configureDb
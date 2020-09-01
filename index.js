const express =require("express")
const app=express()
const cors=require('cors')
app.use(cors())
const router=require('./configure/routes')
const configurDb=require('./configure/configureDb')
const port =7070
app.use(express.json())
configurDb()
app.use(router)
app.listen(port,()=>{
     console.log("server running on port", port)
})

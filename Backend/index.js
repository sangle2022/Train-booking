const express=require("express")
const {connection}=require("./Configs/db")
const {router}=require("./Routes/trainRoutes")
const cors=require("cors")


const app=express()
app.use(cors())
app.use(express.json())
app.get("/",(req,res)=>{
    res.send("Home Page")
})
app.use("/train",router)
app.listen(port=process.env.port||8080,async(req,res)=>{
    try{
        await connection 
        console.log('connected to DB')
    }
    catch(err){
        console.log(err) 
    }
    console.log("server is running on ", port)
})

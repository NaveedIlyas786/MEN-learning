const express =require("express")
const app = express()
const userRouter = require("./routes/user.routes")
const dotenv =require("dotenv")
dotenv.config()
const connectionDB = require("./config/driveDB")
connectionDB()

app.set("view engine", "ejs")
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/driveUser", userRouter) // We have to set first this routes "/driveUser" then we can set the related page route next to it but it is core and necessary for routing
app.listen(3000,()=>{
    console.log("Server is running on port 3000")
})



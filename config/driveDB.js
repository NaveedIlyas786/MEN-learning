const mongoose = require("mongoose")

function connectionDB(){
    mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log("Connected to MongoDB")
    })
}

module.exports =connectionDB
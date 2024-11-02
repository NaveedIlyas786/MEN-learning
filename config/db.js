const mongoose = require("mongoose");

const dbConnection = mongoose.connect("mongodb://0.0.0.0/men").then(()=>{
// const dbConnection = mongoose.connect("mongodb://localhost:27017/men").then(()=>{
    console.log("Connected to MongoDB");
})

module.exports = dbConnection
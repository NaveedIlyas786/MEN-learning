const mongoose =require("mongoose")

const userSchema = new mongoose.Schema({
    username:{type: String, required:true, minlength:[3,"username must be atleast 3 characters long"], trim:true, lowercase:true} ,
    email: {type: String, required:true,  minlength:[3,"email must be atleast 13 characters long"], trim:true, lowercase:true, unique:true},
    password: {type: String, required:true,  minlength:[3,"password must be atleast 3 characters long"], trim:true, lowercase:true},
})

const drivUserModel =mongoose.model("driveuser", userSchema)

module.exports = drivUserModel


const mongoose = require("mongoose")
const {ObjectId} = mongoose.Schema.Types
const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    pic:{
     type:String,
     default:"https://res.cloudinary.com/dxlshtm2n/image/upload/v1637925908/user_2_iwifs0.png"
    },
    followers:[{type: ObjectId,ref:"User"}],
    following:[{type: ObjectId,ref:"User"}],
})

module.exports = mongoose.model("User", UserSchema)
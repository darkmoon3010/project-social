const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
const mongoose = require("mongoose")

const User = mongoose.model("User")
dotenv.config()

module.exports = (req,res, next)=>{
    const {authorization} = req.headers
    if(!authorization){
        res.status(401).json({error: "you must be login"})
    }
    const token = authorization.replace("Bearer ", "")
    jwt.verify(token, process.env.JWT_SECRET, (err, payload)=>{
        if(err){
            return res.status(401).json({error: "you must be logged in"})
        }
        const {_id} = payload
        User.findById(_id).then(userData=>{
            req.user = userData
            next()
        })

    })
}
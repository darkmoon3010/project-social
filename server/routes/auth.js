const express = require("express")
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const requireLogin = require("../middleware/require_login")
const User = mongoose.model("User")
const dotenv = require("dotenv");

dotenv.config();


const router = express.Router()
router.get("/protected",requireLogin,(req, res)=>{
    res.send("HEllo user")
})
//SIGN UP
router.post("/signup",(req, res)=>{
    const {name, email, password, pic} = req.body
    if(!email || !password || !name){
        res.status(422).json({error: "Please add the fields"})
    }
    User.findOne({email:email})
    .then((saveUser)=>{
        if(saveUser){
            return res.status(422).json({error: "user already exists with that email"})
        }
        bcrypt.hash(password, 12)
        .then(hashedPassword=>{
             const user = new User({
            email,
            password: hashedPassword,
            name,
            pic
            })
            user.save()
            .then(user=>{
                res.json({message: "Saved Successfully"})
            })
            .catch(err=>{
                console.log(err)
            })
        })
    })
    .catch(err=>{
        console.log(err)
    })
})

//SIGN IN
router.post("/signin",(req, res)=>{
    const {email, password} = req.body
    if(!email || !password ){
        res.status(422).json({error: "Please add the fields"})
    }
    User.findOne({email:email})
    .then((saveUser)=>{
        if(!saveUser){
            return res.status(422).json({error: "User already exists with that email"})
        }
        bcrypt.compare(password, saveUser.password)
        .then(doMatch=>{
            if(doMatch){
                //res.json({message: "successfully sign in"})
                const token = jwt.sign({_id: saveUser._id}, process.env.JWT_SECRET)
                const {_id, name, email, followers, following, pic} = saveUser
                res.json({token, user:{_id, name, email, followers, following, pic}})
            } else{
                return res.status(422).json({error: "Invalid email or password"})
            }
        })
        .catch(err=>{
            console.log(err)
        })
    })
    .catch(err=>{
        console.log(err)
    })
})



module.exports = router
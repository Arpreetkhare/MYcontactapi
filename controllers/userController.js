const express = require("express");
const bcrypt = require ("bcrypt")
const jwt= require("jsonwebtoken")
const router = express.Router();
const User= require("../models/userModel")


const registerUser = async(req,res) => {
    const {username,email,password } =req.body;
    const user= await User.findOne({email});

    if (!username) {
        return res.status(400).json({ message: "Username is required" });
    }
    if (user){
        res.status(400).json({ message: "Contact with this email or phone number already exists." });
    }
    const hashedPassword = await bcrypt.hash(password,10)
    const newUser= new User({
        username: req.body.username,
        email: req.body.email,
        password:hashedPassword,
    });

    await newUser.save()

    res.status(200).json(newUser)
}


const loginUser = async(req,res) =>{
    const {email,password} = req.body;

    const user = await User.findOne({email});

    if (!user){
        return res.status(400).json({ message: "Invalid email or password" });
        }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid email or password" });
    }    
    const access_token =jwt.sign(
        {
            user : {
                username:user.username,
                password : user.password,
                email:req.email,
                id:user.id,
            },
        },
        process.env.SECRET_KEY ,{expiresIn:"1h"}

    );

    res.status(200).json({access_token})    



    }



const currentUser = async (req,res) =>{
    const curr_user=req.user;
    res.json(curr_user);

}


module.exports={
    registerUser,
    loginUser,
    currentUser,
}

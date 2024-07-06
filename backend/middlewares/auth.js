require("dotenv").config();
const jwt =require("jsonwebtoken")
const User = require("../models/User") 
const { JWT_SECRET } = process.env

exports.auth =  async(req ,res ,next) =>{
    try{
        const token =req.cookies.token
        if(!token) {
            return res.status(401).json({msg:"No token , authorization denied"})
        }
        try{
            const decoded = jwt.verify(token ,JWT_SECRET) 
            console.log(decoded)
            req.user =decoded
        }
        catch(error){
            return res.status(401).json({msg:"Token is not valid"})
        }
        next();
    }
    catch(error) {
        console.log( "Error in Authentication " , error)
    }
}

exports.isStudent=async(req ,res ,next) => {
    try {
        if(req.user.AccountType !== "Student"){
            return res.status(401).json({msg:"You are not a student"})
        }
        next();

    } 
    catch(error) { 
        console.log( "Error in Authentication " , error)

    }
}

exports.isInstructor=async(req ,res ,next) => {
    try {
        if(req.user.AccountType !== "Instructor"){
            return res.status(401).json({msg:"You are not a Instructor"})
        }
        next();

    } 
    catch(error) { 
        console.log( "Error in Authentication " , error)

    }
}

exports.isAdmin=async(req ,res ,next) => {
    try {
        if(req.user.AccountType !== "Admin"){
            return res.status(401).json({msg:"You are not a Admin"})
        }
        next();

    } 
    catch(error) { 
        console.log( "Error in Authentication " , error)

    }
}
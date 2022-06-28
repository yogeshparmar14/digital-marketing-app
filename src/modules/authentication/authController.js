import userModel from "../../db/models/registerSchema.js"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const registration = async (req,res)=>{
    const {name,email,password,termCondition,userType} = req.body

    const user = await userModel.findOne({email})
    if(user)
        return res.send({"message":"Email already exists","status":400})
    if(!name || !email||!password||!termCondition)
        return res.send({"message":"All fields are required","status":400})     
                try {
                
                    const salt = await bcrypt.genSalt(10)
                    const hashPassword = await bcrypt.hash(password,salt)
                    const doc = new userModel({
                        name:name,
                        email:email,
                        password:hashPassword,
                        termCondition:termCondition,
                        userType:userType
                    })
                    await doc.save()
                    const savedUser = await userModel.findOne({email})
                    //Generating JWT TOKEN
                    const token = jwt.sign({userID:savedUser._id},process.env.JWT_SECRET_KEY,{expiresIn:'5D'})
                    res.send({"message":"Signup successfully!", "status":200,
                    "data":{
                        "_id":savedUser._id,
                        "name":savedUser.name,
                        "email":savedUser.email,
                        "accessToken":token}
                    })
                 } catch (error) {
                     console.log(error)
                     res.send({"message":"Unable to register","status":400})
                 
               
               }
            }

const login = async(req,res)=>{
  
        const {email,password} = req.body
            if(!email||!password)
               return res.send({"message":"All fields are required","status":400})
            const user = await userModel.findOne({email:email})
            if(user == null)
               return res.send({ "message":"you are not registered user","status":400})
            const isMatch = await bcrypt.compare(password,user.password)
            if((user.email != email) || !isMatch)
               return res.send({"message":"Email or Password is not valid","status":400})
            try {
                 //Generating JWT token
                const token = jwt.sign({userID:user._id},process.env.JWT_SECRET_KEY,{expiresIn:'5D'})
                    res.send({"message":"Login sucess","status":200,
                    "data":{
                        "_id":user._id,
                        "name":user.name,
                        "email":user.email,
                        "accessToken":token}})
                } catch (error) {
                    console.log(error)
                }
            }
const adminLogin = async(req,res)=>{
    const {email,password} = req.body
            if(!email||!password)
               return res.send({"message":"All fields are required","status":400})
            const user = await userModel.findOne({email:email})
            if(user == null)
               return res.send({ "message":"you are not registered user","status":400})
            const isMatch = await bcrypt.compare(password,user.password)
            if((user.email != email) || !isMatch)
               return res.send({"message":"Email or Password is not valid","status":400})
            try {
                 //Generating JWT token
                const token = jwt.sign({userID:user._id},process.env.JWT_SECRET_KEY,{expiresIn:'5D'})
                    res.send({"message":"Login sucess","status":200,
                    "data":{
                        "_id":user._id,
                        "name":user.name,
                        "email":user.email,
                        "accessToken":token}})
                } catch (error) {
                    console.log(error)
                }
}

    export { registration,login };
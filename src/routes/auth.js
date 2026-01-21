const express = require("express");
const { validateSignUpData } = require("../utils/validation");
const User  = require("../models/user");
const bcrypt = require("bcrypt");
const authRouter = express.Router();

authRouter.post("/signup", async (req,res) => {
    
    // Things to update multiPage signup like Tinder, Otp verification(email, mobileNumber), atttached simple loggin(google, apple, gitHub, and many more.....)
    try{
        validateSignUpData(req);
        
        const {firstName, lastName, email, password} = req.body;
        
        const passwordHash = await bcrypt.hash(password, 10);
        
        const createUser = new User( {firstName, lastName, email, password:passwordHash});
        await createUser.save();
        res.send("User signup succesfully");
    }catch(err){
        res.status(404).send("error " + err.message);
    }
});


authRouter.post("/login", async(req, res) => {
    try{

        const {email, password} = req.body;
        const user = await User.findOne({email: email});
        if(!user){
            throw new Error("all invalid credential");
        }
        const isPasswordValid = await user.validatePassword(password);
        if(isPasswordValid){
            const token = await user.getJwt();
            res.cookie("token", token, {expires: new Date(Date.now() + 7 * 3600000)});
            res.send("login sucessfull");
        }else{
            throw new Error("credential not valid ");
        }
    }catch(err){
        res.status(404).send("error " + err.message);
    }
});


authRouter.post("/logout",async (req,res) => {
    // cleanuo before logout
    res.cookie("token", null, {expires: new Date(Date.now())});
    res.send("logout succesfull");
    
});


module.exports = authRouter;
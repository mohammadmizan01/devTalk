const express = require("express");
const { userAuth } = require("../middlewares/auth");
const user = require("../models/user");
const { validateEditProfileData, forgotPassword } = require("../utils/validation");
const profileRouter = express.Router();
const bcrypt = require("bcrypt");


profileRouter.get("/profileView", userAuth, async(req,res) => {
    try{
        const user = req.user;
        res.send(user);
    }catch(err){
        res.status(404).send("error " + err.message);
    }
});

profileRouter.patch("/profileEdit", userAuth, async(req,res) => {
   try{
       
       if(!validateEditProfileData(req)){
        throw new Error("Invalid Edit Request");
       }

       const loogedInUser = req.user;

        Object.keys(req.body).forEach((key) => (loogedInUser[key] = req.body[key]));
        
        await loogedInUser.save();
        
        // res.send(`${loogedInUser.firstName}, your profile was edit successful`);
        res.json({
            message:`${loogedInUser.firstName}, your profile was edit successful`,
            data: loogedInUser,
        });
   }catch(err){
        res.status(400).send("error " + err.message);
    }
});


profileRouter.patch("/forgotPassword", userAuth, async(req,res) =>{
    try{
    if(!forgotPassword(req)){
        throw new Error("Invalid Edit Request");
    }
    const loogedInUser = req.user;
    console.log(loogedInUser);
    // bcrypt old password
    // update passwrod
    // encrpt updated password
    // save in DB
    
    
    // OR
    console.log(loogedInUser.password);

    Object.keys(req.body).forEach((key) => (loogedInUser[key] = req.body[key]));


    console.log(loogedInUser.password);
    loogedInUser.password = await bcrypt.hash(loogedInUser.password, 10);
    console.log(loogedInUser.password);


    await loogedInUser.save();
    console.log(loogedInUser);

    const userResponse = loogedInUser.toObject();
    delete userResponse.password;
    // res.send("your passwoef");
    res.json({
        message:`${loogedInUser.firstName}, your password updated succesful`,
        data: loogedInUser,
    });
}catch(err){
        res.status(400).send("error " + err.message);
    }
});
module.exports = profileRouter;

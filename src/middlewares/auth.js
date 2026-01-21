const User = require("../models/user");
const jwt = require("jsonwebtoken");

const userAuth = async (req,res,next) => {

try{
    const {token} = req.cookies;

    if(!token){
        throw new Error("Invalid token!!!!!!!!!");
    }
    const verifyToken = await jwt.verify(token,"MohammadMizan@");

    const {id} = verifyToken;
    const user = await User.findById(id);
    if(!user){
        throw new Error("user not found");
    }
    req.user = user;
    next();
    }catch(err){
        res.status(404).send("wrong " + err.message);
    }
    
}
module.exports = {
    userAuth,
}
const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


const userSchema = new mongoose.Schema({
    firstName:{type : String, required:true, minLength:3, maxLength:50},
    lastName:{type : String},
    email:{type : String, lowecase:true, required:true, unique:true, trim:true, 
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid " + value);
            }
        }
    },
    password:{type : String,required:true},
    gender:{type : String, 
        validate(value){
        if(!["male","female","others"].includes(value)){
            throw new Error("Sender data is not valid");
        }
    },},
    photoUrl:{type:String},
    about:{type:String, default:"This is default about of the user!"},
    skills:{type:[String]},
    phoneNumber:{type : Number},
    age:{type : Number, min:18},
    dateOfBirth:{type : Number},
},
{timestamps:true}
);

userSchema.methods.getJwt = async function() {
    const user = this;
    const token = await jwt.sign({id:user._id}, "MohammadMizan@", {expiresIn:"7d"});
    return token;
}


userSchema.methods.validatePassword = async function (userInputPassword){
    const user = this;
    const passwordHash = user.password;
    const isPasswordValid = await bcrypt.compare(userInputPassword, passwordHash);
    return isPasswordValid;
}
module.exports = mongoose.model("User", userSchema); 
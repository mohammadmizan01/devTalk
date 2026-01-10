const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    firstName:{type : String, required:true, minLength:3, maxLength:50},
    lastName:{type : String},
    email:{type : String, lowecase:true, required:true, unique:true, trim:true},
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

module.exports = mongoose.model("User", userSchema);
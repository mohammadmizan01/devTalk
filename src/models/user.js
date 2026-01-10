const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    firstName:{type : String},
    lastName:{type : String},
    email:{type : String},
    password:{type : String},
    gender:{type : String},
    phoneNumber:{type : Number},
    age:{type : Number},
    dateOfBirth:{type : Number},
});

module.exports = mongoose.model("User", userSchema);
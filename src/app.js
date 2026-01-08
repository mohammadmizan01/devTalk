const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.post("/signup",async (req,res) => {
    const user = new User({
        firstName:"Abdul",
        lastName:"Kalam",
        email:"abdul@gmail.com",
        password:"kalam@123"
});
    try{
        await user.save();
        res.send("User add sucessful");
    } catch(err){
        res.status(400).send("Errror in signin" + err.nessage);
    }
});

connectDB()
.then(()=>{
    console.log("DB established");
    app.listen(7000,()=>{
    console.log("Server listen at 7000");
});
})
.catch((err) =>{
    console.error("Db not connect");
});



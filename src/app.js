const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const {validateSignUpData} = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");


app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req,res) => {
    
    try{
        validateSignUpData(req);
        
        const {firstName, lastName, email,password} = req.body;
        
        const passwordHash = await bcrypt.hash(password,10);
                
        const createUser = new User({
            firstName, 
            lastName, 
            email, 
            password: passwordHash,
        });
        await createUser.save();
        res.send("user created");
    }catch(err){
        res.status(400).send("someting went wrong" + err.message);
    }
})

app.post("/login", async (req,res) => {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email:email});
        if(!user){
            throw new Error("credential not valid");
        }   
        // console.log(user.password);
        // console.log(user.firstName);

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(isPasswordValid){

            const token = await jwt.sign({id:user._id}, "MohammadMizan@")
            // console.log(token);
            res.cookie("token", token);
            res.send("Login Successful");

        }else{
            throw new Error("credential not valid ");
        }
    }catch(err){
        res.status(400).send("someting went wrong " + err.message);
    }
});

app.get("/profile", async(req,res) => {
    try{
        const cookies = req.cookies;
        const {token} = cookies;

        if(!token){
            throw new Error("Invalid token");
        }
        const decodedMessage = await jwt.verify(token, "MohammadMizan@");

        const {id} = decodedMessage;
        
        const user = await User.findById(id);
        if(!user){
            throw new Error("user not found");
        }
        res.send(user);
    }catch(err){
        res.status(400).send("someting went wrong " + err.message);
    }
})

app.get("/getUser",async (req,res) =>{
    const userEmail = req.body.email;
    try{
        const user = await User.find({email:userEmail});
        if(user.length === 0){
            res.send("user not found");
        }else{
            res.send(user);
        }
    }catch(err){
        res.status(404).send("someting went wrong " + err.message);
    }
});

app.get("/feed", async (req,res) => {
    try{
        const users = await User.find({});
        if(users.length === 0) {
            res.send("user not found");
        }else{
            res.send(users);
        }
    }catch(err){
        res.status(404).send("something went wrong " + err.message);
    }
});

app.delete("/user", async (req,res) =>{
    const userId = req.body.userId;
    try{
        const deleteUser = await User.findByIdAndDelete(userId);
        res.send("user Deleted successful " );
    }catch(err){
        res.status(401).send("something went wrong " + err.message);
    }
});


app.patch("/user/:userId", async(req,res) => {
    const userId = req.params?.userId;
    const detail = req.body;
    try{
        const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];
        const isUpdatedAllowed = Object.keys(detail).every((k) => ALLOWED_UPDATES.includes(k));
        if(!isUpdatedAllowed){
            throw new Error("Update not allowed");
        }
        if(detail?.skills.length > 10){
            throw new Error("skills cannot be more than 10");
        }
        const user = await User.findByIdAndUpdate(userId, detail, {
            returnDocument:"after",
            runValidator:true,
        });
        res.send(`updated user${user}`);
    }catch(err){
        res.send("something went wrong " + err.message);
    }
})


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



const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.use(express.json());

app.post("/signup", async (req,res) => {
    console.log(req.body);
   
    const createUser = new User(req.body);
    try{
        await createUser.save();
        res.send("user created");
    }catch(err){
        res.status(400).send("someting went wrong" + err.message);
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


app.patch("/user", async(req,res) => {
    const userId = req.body.userId;
    const detail = req.body;
    try{
        const user = await User.findByIdAndUpdate(userId, detail, {
            returnDocument:after,
            runValidator:ture,
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



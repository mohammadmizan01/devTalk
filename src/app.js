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
    }
    catch(err){
        res.status(400).send("someting went wrong" + err.message);
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



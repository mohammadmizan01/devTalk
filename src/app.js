const express = require("express");

const app = express();

const {adminAuth, userAuth} = require("./middlewares/auth");

app.use("/admin",adminAuth);
app.use("/user",userAuth);

app.get("/admin/fetchAllData",(req,res) => {
    res.send("send all data");
});

app.get("/admin/deleteAllData", (req,res) => {
    res.send("delete all data");
});

app.post("/user/sendData", (req,res) => {
    res.send("Data send Succesfull");
})


app.listen(7000,()=>{
    console.log("Server listen at 7000");
});


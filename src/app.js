const express = require("express");

const app = express();

app.use("/", (req,res) =>{
    res.end("response from server response");
})

app.use("/test", (req,res) =>{
    res.end("test page");
})


app.listen(7000,()=>{
    console.log("Server listen at 7000");
});


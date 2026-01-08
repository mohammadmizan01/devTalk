const express = require("express");

const app = express();


app.post("/user",(req,res,next) =>{
    console.log('first');
    // res.send({firstName: "Mohammad", lastName:"Mizan"});
    next();
},
(req,res,next) => {
    console.log('2nd');
    // res.send({firstName: "none", lastName:"Mizan"});
    next();
});

app.get("/test", (req,res) =>{
    res.end("test page");
});

// app.use("/", (req,res) =>{
//     res.end("response from server response");
// });


app.listen(7000,()=>{
    console.log("Server listen at 7000");
});


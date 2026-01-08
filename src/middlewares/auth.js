const adminAuth = (req,res,next) => {
    console.log("verify admin");
    const token = "zta"
    const isAdmin = token === "zta";
    if(!isAdmin){
        res.status(401).send("unauthorized acces");
    }
    else{
        next();
    }
}


const userAuth = (req,res,next) => {
    console.log("user authentication check");
    const token = "aaa";
    const isUser = token === "aaa";
    if(!isUser){
        res.status(401).send("you are not user");
    }
    else{
        next();
    }
}
module.exports = {
    adminAuth,
    userAuth,
}
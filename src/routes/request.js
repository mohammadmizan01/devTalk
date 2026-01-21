const express = require("express");
const requestRouter =  express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const user = require("../models/user");

requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req,res) => {
    try{
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status
        });

        const validStatus = ["ignored", "interested"];
        if(!validStatus.includes(status)){
            return res.status(400)
            .json({message:"invalid status type: " + status});
        }

        const existingConnectionRequest = await ConnectionRequest.findOne({
            $or:[
                {fromUserId, toUserId},
                {fromUserId:toUserId, toUserId:fromUserId},
            ],
        });
        if(existingConnectionRequest){
            return res.status(400).send({message: "Connection already existis"});
        }

        const toUser = await user.findById(toUserId);
        if(!toUser){
            return res.status(400).send({message: "user not existis"});
        }

        const data = await connectionRequest.save();

        res.json({
            message:req.user.firstName + " is " + status + " in " + toUser.firstName,
            data
        });

    }catch(err){
        res.status(500).send("error " + err.message);
    }
});

module.exports = requestRouter;
const User = require("../models/User");
const Router = require("express").Router;
const router = Router();

import { userInfo } from "os";

router.put("/user/:id/friends/add", (req,res) => {

    const id = req.params["id"];
    const newFriend = req.body["friend"];
    console.log("here");
    User.findOneAndUpdate({"phoneNumber": id},
        {$addToSet: {"friendList": newFriend}},
        (error, user) => {
            if (user) {
                res.body["friendList"] = user["friendList"];
                return res.status(200);
            }
            else {
                return res.status(400);
            }
        });

    console.log("done ");
});
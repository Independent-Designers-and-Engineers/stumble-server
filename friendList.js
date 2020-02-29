const User = require("../models/User");
const Router = require("express").Router;
const router = Router();
const logger = require("../validation/errors");

import { userInfo } from "os";
import { loggers } from "winston";

router.put("/user/:id/friends/add", (req, res) => {

    const id = req.params["id"];
    const newFriend = req.body["friend"];
    console.log("here");
    User.findOneAndUpdate({ "phoneNumber": id },
        { $addToSet: { "friendList": newFriend } },
        (err, user) => {
            if (user) {
                res.body["friendList"] = user["friendList"];
                return res.status(200);
            }
            else {
                logger.error(err);
            }
        });

    console.log("done ");
});
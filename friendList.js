import { userInfo } from "os";

router.put("/user/:id/friends/add", (req,res) => {

    const id = req.params["id"];
    const newFriend = req.body["friend"];

    User.findOneAndUpdate({"friend": 480},
        {"friendList": {"$addToSet":newFriend}},

    )
});
const User = require("models/User");

//returns all user IDs
router.get("/user/{id}/friends", async (req, res) => {
    const phoneNumber = req.params(["id"])
    const fetchedProfile = await User.findOne({ "phoneNumber": phoneNumber })

    findOne({ "phoneNumber": phoneNumber })
    res.body["friendList"] = fetchedProfile["friendList"]
    return res.status(200)
});

//add or remove from friends list
router.put("/:id/friends", async (req, res) => {
    const phoneNumber = req.params(["id"])
    const fetchedProfile = await User.findOneAndUpdate({ "phoneNumber": phoneNumber })
    const fetchedProfile2 = await User.findOneAndUpdate({ "phoneNumber": phoneNumber })

    fetchedProfile.friendList.push(res.body[friendList])
    fetchedProfile2.friendList.pop(res.body[friendList.foreach()])
    return res.status(200)
});


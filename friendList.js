const User = require("models/User");

function viewFriends() {
    return UserSchema["friendList"]
}

// POST /user/create
router.put("/:id/friends", async (req, res) => {
    const body = req.body;
    const phoneNumber = req.params(["id"])
    const fetchedProfile = await User.findOne({phoneNumber: phoneNumber})
});
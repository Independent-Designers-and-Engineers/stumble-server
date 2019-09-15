// Imports
const Router = require("express").Router;

// Create a new Express router for "/user" route
const router = Router();

// POST /user
router.post("/", (req, res) => {
    // TODO: Implement this (#5)
    // If we get a POST request for "/user", just get the firstname and send it back
    const firstName = req.body.firstName;
    res.send(firstName + " is logged in");
});

// POST /user/create
router.post("/create", (req, res) => {
    // TODO: Implement this (#2)
});

// Export this so it can be used outside
module.exports = router;
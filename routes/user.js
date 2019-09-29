// Imports
const Router = require("express").Router;
const mongoose = require("mongoose");

const User = require("../models/User");

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
router.post("/create", async (req, res) => {
    const body = req.body;
    // If any of the fields are not there, send a 400 Bad Request response
    if (!body.firstName || !body.lastName || !body.phoneNumber || !body.dateOfBirth || !body.password) {
        res.status(400).send({ message: "One or more fields not present" });
        return;
    }
    // If there is a document already in the database, send a 409 Conflict response
    let found = false;
    await User.findOne({ phoneNumber: body.phoneNumber }, (err, user) => {
        if (user) {
            found = true;
        }
    });
    // If there isn't a document already, create a new one, save it, and send a 201 Created response
    if (!found) {
        const user = new User({
            name: `${body.firstName} ${body.lastName}`,
            phoneNumber: body.phoneNumber,
            dateOfBirth: body.dateOfBirth,
            password: body.password
        });
        user.save();
        res.status(201).send({ message: "User created" });
    } else {
        res.status(409).send({ message: "User already exists" });
    }
});

// GET /user/{id}/profile
router.get("/:id/profile", (req, res) => {
    const phoneNumber = req.params["id"];
    User.findOne({ phoneNumber: phoneNumber }, (err, user) => {
        if (user) {
            const foundUser = user;
            delete foundUser.password;
            delete foundUser.phoneNumber;
            res.status(200).send(foundUser);
        }
        else {
            res.status(404).send({ message: "User doesn't exist"});
        }
    });
});

// Export this so it can be used outside
module.exports = router;
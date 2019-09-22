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
router.post("/create", (req, res) => {
    const body = req.body;
    // If any of the fields are not there, send a 400 Bad Request response
    if (!body.firstName || !body.lastName || !body.phoneNumber || !body.dateOfBirth || !body.password) {
        res.status(400).send({ message: "One or more fields not present" });
        return;
    }
    // If there is a document already in the database, send a 409 Conflict response
    User.findOne({ phoneNumber: body.phoneNumber }, (err, user) => {
        if (user) {
            res.status(409).send({ message: "User already exists" });
        } else {
            const user = new User({
                name: `${body.firstName} ${body.lastName}`,
                phoneNumber: body.phoneNumber,
                dateOfBirth: body.dateOfBirth,
                password: body.password
            });
            user.save();
            res.status(201).send({ message: "User created" });
        }
    });
});

// Export this so it can be used outside
module.exports = router;
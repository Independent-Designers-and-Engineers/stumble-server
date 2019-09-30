// Imports
const Router = require("express").Router;
const mongoose = require("mongoose");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validateLoginInput = require("../models/login");
const SECRET = process.env.SECRET;

// Create a new Express router for "/user" route
const router = Router();

// POST /user
router.post("/login", (req, res) => {
    // TODO: Implement this (#5)
    // If we get a POST request for "/user", just get the firstname and send it back

    const {error, isValid} = validateLoginInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    } 

    const { phoneNumber, password } = req.body;

    User.findOne({ phoneNumber }).then((user) => {

        if(!user){
            errors.phoneNumber = "User not found."
            return res.status(404).json(errors);
        }

        bcrypt.compare(password, user.password).then( isMatch => {

            if(isMatch){
                const payload = {
                    user_name : user.phoneNumber
                };

                jwt.sign(payload, SECRET, {expiresIn: 3600}, (err, token) =>{

                    if(err){
                        console.log(err);
                    }

                    return res.json({

                        sucess: true,
                        token: token,
                        profile: user

                    });
                });
            } else {
                return res.status(400).json({ password: "Password Incorrect"});
            }

        });
    });
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

// Export this so it can be used outside
module.exports = router;
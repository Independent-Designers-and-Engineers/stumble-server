// Imports
const Router = require("express").Router;

const bcrypt = require("bcrypt");
const passport = require("passport");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const validateLoginInput = require("../validation/login");
const SECRET = process.env.SECRET;

// Create a new Express router for "/user" route
const router = Router();

// POST /user
router.post("/login", (req, res) => {
    const {errors, isValid} = validateLoginInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    } 

    const { phoneNumber, password } = req.body;
    User.findOne({ phoneNumber }).then((user) => {
        if(!user){
            errors.phoneNumber = "User not found.";
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
                        token: `Bearer ${token}`
                    });
                });
            } else {
                return res.status(400).json({ password: "Password Incorrect"});
            }
        });
    });
});

// POST /user/create
router.post("/create", (req, res) => {
    const body = req.body;
    // If any of the fields are not there, send a 400 Bad Request response
    if (!body.firstName || !body.lastName || !body.phoneNumber || !body.dateOfBirth || !body.password) {
        res.status(400).json({ message: "One or more fields not present" });
        return;
    }
    // If there is a document already in the database, send a 409 Conflict response
    User.findOne({ phoneNumber: body.phoneNumber }, (err, user) => {
        if (user) {
            res.status(409).json({ message: "User already exists" });
        } else {
            const user = new User({
                name: `${body.firstName} ${body.lastName}`,
                phoneNumber: body.phoneNumber,
                dateOfBirth: body.dateOfBirth,
                password: body.password
            });

            // Generate a bcrypt salt for hashing passwords
            bcrypt.genSalt(10, (err, salt) => {
                // Hash the password with the generated salt, then save it in the DB and send response
                bcrypt.hash(user.password, salt, (err, hash) => {
                    if (err) {
                        throw err;
                    }
                    user.password = hash;
                    user.save()
                        .then(user => res.status(201).json(user))
                        .catch(console.err);
                });
            });
        }
    });
});

// GET /user/current
router.get("/current", passport.authenticate("jwt", { session: false }), (req, res) => {
    // TODO: Test this when login works
    res.json(req.user);
});

// Export this so it can be used outside
module.exports = router;
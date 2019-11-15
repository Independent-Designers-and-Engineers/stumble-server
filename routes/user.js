// Imports
const Router = require("express").Router;

const bcrypt = require("bcrypt");
const passport = require("passport");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const validateCreateInput = require("../validation/createAccount");
const validateLoginInput = require("../validation/login");
const SECRET = process.env.SECRET;

// Create a new Express router for "/user" route
const router = Router();

// POST /user
router.post("/login", (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const { phoneNumber, password } = req.body;
    User.findOne({ phoneNumber }).then((user) => {
        if (!user) {
            errors.phoneNumber = "User not found.";
            return res.status(404).json(errors);
        }
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                const payload = {
                    phoneNumber : user.phoneNumber
                };
                jwt.sign(payload, process.env.SECRET, { expiresIn: 3600 }, (err, token) => {
                    if (err) {
                        console.log(err);
                    }
                    return res.json({
                        token: `Bearer ${token}`
                    });
                });
            } else {
                return res.status(400).json({ password: "Password Incorrect" });
            }
        });
    });
});

// POST /user/create
router.post("/create", (req, res) => {
    const body = req.body;
    
    const { errors, isValid } = validateCreateInput(body);
    if (!isValid) {
        return res.status(400).json(errors);
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
                        .then(() => res.status(201).json())
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

// GET /user/{id}/profile
router.get("/:id/profile", passport.authenticate("jwt", { session: false }), (req, res) => {
    const id = req.params["id"];
    User.findById(id, { password: 0, phoneNumber: 0 }, (err, user) => {
        if (user) {
            let foundUser = user;
            res.status(200).send(foundUser);
        }
        else {
            res.status(404).send({ message: "User doesn't exist" });
        }
    });
});

// PATCH /user/:id/profile
router.patch("/:id/profile", passport.authenticate("jwt", { session: false }), (req, res) => {
    User.findByIdAndUpdate(req.params["id"], req.body, {new: true}, (error, user) => {
        if (user) {
            res.status(200).send();
        } else {
            res.status(404).send({ message: "User doesn't exist" });
        }
    });
});

// GET /user/:id/blocked
router.get("/:id/blocked", passport.authenticate("jwt", { session: false }), (req, res) => {
    User.findById(req.params["id"], { "blocked": 1 }, (error, user) => {
        if (user) {
            res.status(200).send(user);
        } else {
            res.status(404).send({ message: "User doesn't exist" });
        }
    });
});

// GET /user/{id}/interests
router.get("/:id/interests", passport.authenticate("jwt", { session: false }), (req, res) => {
    User.findById(req.params["id"], { "interests": 1 }, (error, user) => {
        if (user) {
            return res.status(200).send(user);
        } else {
            return res.status(404).send({ message: "User not found" });
        }
    });
});

// POST /user/:id/interests
router.post("/:id/interests", passport.authenticate("jwt", { session: false }), (req, res) => {
    const body = req.body;
    if(!body.category || !body.values) { //If there is no category or value
        res.status(400).send({ message: "One or more fields not present" });
        return;
    }
    User.findById(req.params["id"], (err, user) => {
        if(!user) {
            res.status(404).send({ message: "User not found" });
        }
        else {
            if (user.interests.length == 0) {
                user.interests = [body];
                user.save(() => { res.status(200).send(); });
            } else {
                User.findById(req.params["id"],
                    { $addToSet: { "interests.$[elem].values": body.values} }, { arrayFilters: [{"elem.category": body.category}] }, () => {
                        res.status(200).send();
                    });
            }
        }
    });
});

//GET /user/:id/friends
router.get("/:id/friends", passport.authenticate("jwt", { session: false }), (req, res) => {
    User.findById(req.params["id"], { "friends": 1 }, (error, user) => {
        if (user) {
            return res.status(200).send(user);
        } else {
            return res.status(404).send();
        }
    });
});

// POST /user/:id/friends
router.post("/:id/friends", passport.authenticate("jwt", { session: false }), (req,res) => {
    const newFriend = req.body["friend"];
    User.findByIdAndUpdate(req.params["id"], {$addToSet: {"friends": newFriend}}, (error, user) => {
        if (user) {
            User.findByIdAndUpdate(newFriend, {$addToSet: {"friends": user.id}}, (error, friend) => {    
                if (friend) {
                    return res.status(200).send();
                } else { 
                    return res.status(404).send();
                }
            });
        } else {    
            return res.status(404).send();
        }
    });    
});

// POST /user/:id/blocked
router.post("/:id/blocked", (req, res) => {
    const blockedUser = req.body["blocked"];
    User.findByIdAndUpdate(req.params["id"], {$addToSet: {"blocked" : blockedUser}}, (error, user) => {
        if (user) {
            User.findByIdAndUpdate(blockedUser, {$addToSet: {"blocked": user.id}}, (error, block) => {    
                if (block) {
                    return res.status(200).send();
                } else { 
                    return res.status(404).send();
                }
            });
        } else {
            return res.status(404).send();
        }
    });
});

// DELETE /user/:id/blocked
router.delete("/:id/blocked", (req, res) => {
    const blockedUser = req.body["unblock"];
    User.findByIdAndUpdate(req.params["id"], {$pull: {"blocked": blockedUser}}, (error, user) => {
        if (user) {
            User.findByIdAndUpdate(blockedUser, {$pull: {"blocked": user.id}}, (error, block) => {    
                if (block) {
                    return res.status(200).send();
                } else { 
                    return res.status(404).send();
                }
            });
        } else {    
            return res.status(404).send();
        }
    });
});

// Export this so it can be used outside
module.exports = router;

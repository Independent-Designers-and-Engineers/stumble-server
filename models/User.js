// Imports
const mongoose = require("mongoose");

// Define the User model with each field
const UserSchema = new mongoose.Schema({
    name: String,
    phoneNumber: String,
    password: String,
    dateOfBirth: Date,
    friends: []
});

// Export the model
module.exports = mongoose.model("User", UserSchema);
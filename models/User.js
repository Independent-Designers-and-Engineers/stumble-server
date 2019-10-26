// Imports
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the User model with each field
const UserSchema = new mongoose.Schema({
    name: String,
    phoneNumber: String,
    password: String,
    dateOfBirth: Date,
    interests: [{
      category: String,
      values: [String]
    }],
    blocked: [{
        type: Schema.ObjectId,
        ref: "User"
    }],
    friends: [{
        type: Schema.ObjectId,    
        ref: "User"
    }]
});

// Export the model
module.exports = mongoose.model("User", UserSchema);
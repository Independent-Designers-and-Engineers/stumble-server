// Imports
const express = require("express");             // This is the main one, it'll handle running the HTTP server and capturing all requests
const bparser = require("body-parser");         // This one is used with Express so that it can read the request bodies sent to it
const WebSocket = require("ws");
const mongoose = require("mongoose");

// Import our own modules/files
const UserRouter = require("./routes/user");    // This is the Express router for the "/user" route

// If we're running the server locally, configure the environment variables from .env file
if (process.env.NODE_ENV === "dev" || process.argv[2] === "dev") {
    require("dotenv").config();
}
const PORT = process.env.PORT || 5000;
const MONGODB_URL = process.env.MONGODB_URL || "";

// Create the server instance and make it use the JSON parser from body-parser
const app = express();
app.use(bparser.json());

const wss = new WebSocket.Server({ server: app });

// Connect to the MongoDB server
mongoose.connect(MONGODB_URL, { useNewUrlParser: true });

// Set base routes to respective routers
app.use("/user", UserRouter);   // Make "/user" the base route for the "/user" router

// If we get a request for the root, just send a simple JSON message
app.get("/", (req, res) => {
    res.json({
        message: "Welcome to Stumble!"
    });
});

// Start both WebSocket and Express servers listening at specified port
app.listen(PORT);

console.log(`Listening at ${PORT}`);
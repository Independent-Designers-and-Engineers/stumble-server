// Import the packages we need
import express from "express";          // This is the main one, it'll handle running the HTTP server and capturing all requests
import { json } from "body-parser";     // This one is used with Express so that it can read the request bodies sent to it

// Import our own modules/files
import UserRoute from "./routes/user";  // This is the Express router for the "/user" route

// If we're running the server locally, configure the environment variables from .env file
if (process.env.NODE_ENV === "dev") {
    require("dotenv").config();
}
const EXPRESS_PORT = process.env.EXPRESS_PORT || 5000;
// const WS_PORT = process.env.WS_PORT || 5001;
// const MONGODB_URL = process.env.MONGODB_URL || "";

// Create the server instance and make it use the JSON parser from body-parser
const app = express();
app.use(json());

// Set base routes to respective routers
app.use("/user", UserRoute);    // Make "/user" the base route for the "/user" router

// If we get a request for the root, just send a simple JSON message
app.get("/", (req, res) => {
    res.json({
        message: "Welcome to Stumble!"
    });
});

// Start the server listening at port specified port
app.listen(EXPRESS_PORT);
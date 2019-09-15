// Imports
import { Router } from "express";

// Create a new Express router for "/user" route
const router = Router();

// POST /user
router.get("/", (req, res) => {
    // TODO: Implement this (#5)
    // If we get a POST request for "/users", just get the firstname and send it back
    const firstName = req.body.firstName;
    res.send(firstName + " is logged in");
});

// POST /user/create
router.post("/create", (req, res) => {
    // TODO: Implement this (#2)
});

// Export this so it can be used outside
export default router;
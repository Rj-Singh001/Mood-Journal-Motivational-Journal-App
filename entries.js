const express = require("express");
const Entry = require("../models/Entry");
const jwt = require("jsonwebtoken");

const router = express.Router();

const authenticate = (req, res, next) => {
    const token = req.header("x-auth-token");
    if (!token) return res.status(401).json({ error: "No token, authorization denied" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.userId;
        next();
    } catch (err) {
        res.status(401).json({ error: "Token is not valid" });
    }
};

router.post("/", authenticate, async (req, res) => {
    const { title, content, mood } = req.body;
    try {
        const entry = new Entry({ userId: req.user, title, content, mood });
        await entry.save();
        res.status(201).json(entry);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.get("/", authenticate, async (req, res) => {
    try {
        const entries = await Entry.find({ userId: req.user });
        res.json(entries);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.put("/:id", authenticate, async (req, res) => {
    const { title, content, mood } = req.body;
    try {
        
        const updatedEntry = await Entry.findByIdAndUpdate(
            req.params.id, 
            { title, content, mood }, 
            { new: true } 
        );

        if (!updatedEntry) {
            return res.status(404).json({ error: "Entry not found" });
        }

        res.json(updatedEntry);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.delete("/:id", authenticate, async (req, res) => {
    try {
        
        const deletedEntry = await Entry.findByIdAndDelete(req.params.id);

        if (!deletedEntry) {
            return res.status(404).json({ error: "Entry not found" });
        }

        res.json({ message: "Entry deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
module.exports = router;

const express = require("express");

const router = express.Router();

const quotes = [
    "Believe in yourself.",
    "You are stronger than you think.",
    "Every day is a new beginning.",
];

router.get("/", (req, res) => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    res.json({ quote: randomQuote });
});

module.exports = router;

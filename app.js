const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", require("./routes/auth"));
app.use("/entries", require("./routes/entries"));
app.use("/quotes", require("./routes/quotes"));

app.get("/", (req, res) => res.send("API is running"));

module.exports = app;

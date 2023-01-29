require("dotenv").config();
const express = require("express");
const cors = require("cors");
const user = require("./routes/User");
const multer = require("multer");
connectDB = require("./db");

port = process.env.PORT || 5000;

connectDB();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/public", express.static("public")); //To serve static files such as images, CSS files, and JavaScript files, use the express.static built-in middleware function in Express.

app.use("/api", user);

app.listen(port, (req, res) => {
  console.log(`Server is running on http://localhost:${port}`);
});

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./Config/db");
const userRoutes = require("./Routes/users_routes");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", userRoutes);

app.get("/", (req, res) => {
  res.send("REST API is running");
});

module.exports = app;
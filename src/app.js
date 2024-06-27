require("dotenv").config();
const express = require("express");
const { errorMiddleware } = require("./middlewares/error.middleware");

const app = express();
//other middleware
app.use(express.json());
//Define routes
const userRoutes = require("./routes/user.route");
const authRoutes = require("./routes/auth.route");

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/auth", authRoutes);

//error handling middleware
app.use(errorMiddleware);
module.exports = app;

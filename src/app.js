require("dotenv").config();
const express = require("express");
const { errorMiddleware } = require("./middlewares/error.middleware");

const app = express();
//other middleware
app.use(express.json());
//Define routes
const userRoutes = require("./routes/user.route");
const authRoutes = require("./routes/auth.route");
const electionRoutes = require("./routes/election.route");
const candidateRoutes = require("./routes/candidate.route");

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/election", electionRoutes);
app.use("/api/v1/candidate", candidateRoutes);

//error handling middleware
app.use(errorMiddleware);
module.exports = app;

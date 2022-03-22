require("dotenv").config();
const express = require("express");
const appRoutes = require("./routes/app-routes.js");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

// creation of routes functionality
const app = express();

// middleware
app.use(express.json());
app.use(cookieParser());

// database connection
const dbURI = process.env.DATABASE_URI;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3030))
  .catch((err) => console.log(err));

// app routes
app.use("/api", appRoutes);
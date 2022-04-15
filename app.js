require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

// creation of routes functionality
const app = express();

// middleware
app.use(express.static("public"));    
app.use(express.json());
app.use(cookieParser());
const { authorise } = require("./middleware/authorise.js");

// database connection
const dbURI = process.env.DATABASE_URI;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then((result) => app.listen(4030))
.catch((err) => console.log(err));

// view engine
app.set('view engine', 'ejs');

// app routes
// default route that is called (the home page)
app.get('/', authorise, (req, res) => res.render('home'));

// routes for when the user has not logged in yet
const preLoginRoutes = require("./routes/pre-login-routes.js");
app.use("/api", preLoginRoutes);

// routes for when user has logged in
const postLoginRoutes = require("./routes/post-login-routes.js");
app.use("/api", postLoginRoutes);
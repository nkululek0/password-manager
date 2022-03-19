const express = require("express");
const appRoutes = require("./routes/app-routes.js");
const mongoose = require("mongoose");

// middleware


// creation of routes functionality
const app = express();
app.listen()

// database connection
const dbURI = 'mongodb+srv://nkululek0:mongodb@certification.bscdz.mongodb.net/node-auth';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3030))
  .catch((err) => console.log(err));

// app routes
app.use(appRoutes);
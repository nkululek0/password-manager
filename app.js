import express from "express";
import appRoutes from "./routes/app-routes.js";
import mongoose from "mongoose";

// creation of routes functionality
const app = express();
app.listen()

// database connection
const dbURI = 'mongodb+srv://nkululek0:mongodb@certification.bscdz.mongodb.net/node-auth';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// app routes
app.use(appRoutes);
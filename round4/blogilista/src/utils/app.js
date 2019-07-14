const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const { MONGO_URI } = require("./").config;
const { ErrorHandler } = require("../errors");
const routes = require("../routes");

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => console.log("Connected to database"))
  .catch(err => {
    console.log("Error connecting to database:", err.message);
    process.exit(1);
  });

app.use(cors());
app.use(bodyParser.json());

app.use("/api/blogs/", routes.apiBlogs);
app.use("/api/users/", routes.apiUsers);

app.use(ErrorHandler);

module.exports = app;

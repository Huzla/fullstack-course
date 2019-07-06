const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const { MONGO_URI } = require("./").config;
const Blog = require("./../models").blog;

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => console.log("Connected to database"))
  .catch(err => {
    console.log("Error connecting to database:", err.message);
    process.exit(1);
  });

app.use(cors());
app.use(bodyParser.json());

app.get("/api/blogs", (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    });
});

app.post("/api/blogs", (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    });
});

module.exports = app;

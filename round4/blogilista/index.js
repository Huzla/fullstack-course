const http = require("http");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const { PORT, MONGO_URI } = require("./src/utils").config;
const Blog = require("./src/models").blog;


mongoose.connect(MONGO_URI, { useNewUrlParser: true, useCreateIndex: true });

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


app.listen(PORT, () => {
  console.log(`Server running on port ${ PORT }`)
});

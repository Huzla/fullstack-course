const services = require("../../services").apiBlogs;

const getBlogs = (request, response, next) => {
  services.allBlogs()
    .then(blogs => {
      response.json(blogs)
    })
    .catch(next);
};

const postBlog = async (request, response, next) => {
  servicess.newBlog(request.body)
    .then(result => {
      response.status(201).json(result)
    })
    .catch(next);
};

module.exports = {
  getBlogs,
  postBlog
};

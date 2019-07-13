const services = require("../../services").apiBlogs;



const getBlogs = async (req, res, next) => {
  try {
    res.json(await services.allBlogs());
  }
  catch (err) {
    next(err);
  }
};

const postBlog = async (req, res, next) => {
  try {
    const result = await services.newBlog(req.body);
    res.status(201).json(result);
  }
  catch (err) {
    next(err);
  }
};

module.exports = {
  getBlogs,
  postBlog
};

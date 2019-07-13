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
  servicess.newBlog(req.body)
    .then(result => {
      res.status(201).json(result)
    })
    .catch(next);
};

module.exports = {
  getBlogs,
  postBlog
};

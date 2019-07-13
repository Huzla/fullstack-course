const services = require("../../services").apiBlogs;
const { NotFoundError } = require("../../errors");

//-------------------------------------------GET-------------------------------------
const getBlogs = async (req, res, next) => {
  try {
    res.json(await services.allBlogs());
  }
  catch (err) {
    next(err);
  }
};

//----------------------------------------POST------------------------------------------
const postBlog = async (req, res, next) => {
  try {
    const result = await services.newBlog(req.body);
    res.status(201).json(result);
  }
  catch (err) {
    next(err);
  }
};

//----------------------------------------DELETE----------------------------------------

const deleteBlog = async (req, res, next) => {
  try {
    const removed = await services.removeBlog(req.params.id);

    if (removed.deletedCount)
      return res.status(204).end();

    throw NotFoundError("blog");
  }
  catch (err) {
    next(err);
  }
};

//-------------------------------------------PUT----------------------------------------

module.exports = {
  getBlogs,
  postBlog,
  deleteBlog
};

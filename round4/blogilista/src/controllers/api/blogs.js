const services = require("../../services").apiBlogs;
const { NotFoundError, JsonWebTokenError } = require("../../errors");
const { TOKEN_SECRET } = require("../../utils/config.js");
const jwt = require('jsonwebtoken');

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

    const token = req.token;
    const decodedToken = jwt.verify(token, TOKEN_SECRET);

    if (!token || !decodedToken.userId) {
      throw JsonWebTokenError("Token missing or invalid.");
    };

    const result = await services.newBlog(req.body, decodedToken.userId);
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

const putBlog = async (req, res, next) => {
  try {
    const blog = await services.changeBlog(req.params.id, req.body.likes);

    if (!blog)
      throw NotFoundError("blog");

    res.status(204).end();
  }
  catch (err) {
    next(err);
  }
};

module.exports = {
  getBlogs,
  postBlog,
  deleteBlog,
  putBlog
};

const services = require("../../services").apiTesting;

const postReset = async (req, res, next) => {
  try {
    await services.reset();

    res.status(201).end();
  }
  catch (err) {
    next(err);
  }
};

module.exports = {
  postReset
};

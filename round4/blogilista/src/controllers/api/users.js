const services = require("../../services").apiUsers;
const { NotFoundError } = require("../../errors");
const bcrypt = require('bcrypt');

//-------------------------------------------GET-------------------------------------
const getUsers = async (req, res, next) => {
  try {
    res.json(await services.allUsers());
  }
  catch (err) {
    next(err);
  }
};

//----------------------------------------POST------------------------------------------
const postUser = async (req, res, next) => {
  try {
    const saltRounds = 10
    const pass = await bcrypt.hash(req.body.password, saltRounds);

    delete req.body.password;

    const newUser = await services.newUser({ ...req.body, pass });

    res.status(201).json(newUser);
  }
  catch (err) {
    next(err);
  }
};

//----------------------------------------DELETE----------------------------------------

const deleteUser = async (req, res, next) => {
  try {
    return res.status(501).end();
  }
  catch (err) {
    next(err);
  }
};

//-------------------------------------------PUT----------------------------------------

const putUser = async (req, res, next) => {
  try {
    res.status(501).end();
  }
  catch (err) {
    next(err);
  }
};

module.exports = {
  getUsers,
  postUser,
  deleteUser,
  putUser
};

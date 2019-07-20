const services = require("../../services").apiUsers;
const { NotFoundError, ValidationError } = require("../../errors");
const { PASS_LENGTH, USERID_LENGTH, TOKEN_SECRET } = require("../../utils/config.js");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/*
const getTokenFrom = (req) => {
  const authorization = req.get('authorization');

  if (authorization && authorization.toLowerCase().startsWith('bearer '))
    return authorization.substring(7);

  return null;
};
*/

//-------------------------------------------GET-------------------------------------
const getUsers = async (req, res, next) => {
  try {
    res.json((await services.allUsers()).map(user => { return { name: user.name, userId: user.userId }; }));
  }
  catch (err) {
    next(err);
  }
};

//----------------------------------------POST------------------------------------------
const postUser = async (req, res, next) => {
  try {
    const body = req.body;

    if (!body.password || body.password.length < PASS_LENGTH)
      throw ValidationError(`password should be at least ${ PASS_LENGTH } characters long`, "password");

    if (!body.userId || body.userId.length < USERID_LENGTH)
      throw ValidationError(`user id should be at least ${ USERID_LENGTH } characters long`, "userId");

    const saltRounds = 10
    const password = await bcrypt.hash(body.password, saltRounds);

    delete body.password;

    const newUser = await services.newUser({ ...body, password });

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

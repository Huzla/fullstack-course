const { CredentialsError } = require("../errors");
const { TOKEN_SECRET } = require("../utils/config.js");
const services = require("../services").apiUsers;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//-------------------------------------------GET-------------------------------------


//----------------------------------------POST------------------------------------------
const postLogin = async (req, res, next) => {
  const body = req.body;

  try {
    const user = await services.getUser(body.userId);

    const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(body.password, user.password);

    if (!(user && passwordCorrect)) {
      throw CredentialsError();
    }

    const userForToken = {
      userId: user.userId
    };

    const token = jwt.sign(userForToken, TOKEN_SECRET);

    res
    .status(200)
    .json({ token, name: user.name });
  }
  catch (err) {
    next(err);
  }
};

module.exports = {
  postLogin
};

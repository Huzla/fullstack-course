const JsonWebTokenError = (message) => {
  let err = Error(message);
  err.name = "JsonWebTokenError";
  return err;
};

module.exports = JsonWebTokenError;

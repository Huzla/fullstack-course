const ValidationError = (message, target) => {
  let err = Error(message);
  err.name = "ValidationError";
  err.errors = {};
  err.errors[target] = {
    message: message
  };
  return err;
};

module.exports = ValidationError;

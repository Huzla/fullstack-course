
const ErrorHandler = (err, req, res, next) => {
  console.log(err.message);

  const sendError = (code) => {
    const errors = err.errors;
    let message = err.message;

    if (errors)
      message = errors[Object.keys(errors)[0]].message;

    return res.status(code).json({ message });
  };


  switch (err.name) {
  case "ValidationError":
    return sendError(400);
  case "NoResourceError":
    return sendError(404);
  case "CredentialsError":
    return sendError(401);
  case "JsonWebTokenError":
    return sendError(401);
  case "CastError":
    return sendError(400);
  default:
    return res.status(500).json({ message: "Internal server error." });

  }

};

module.exports = ErrorHandler;

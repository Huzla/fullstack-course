
const ErrorHandler = (err, req, res, next) => {
  console.log(err.code, err.stack);

  let code = 500;
  let message = '';

  const setVars = (c,m) => {
    code = c;
    message = m;
  };

  switch (err.code) {
    case 11000:
      setVars(400, "Name must be unique!");
      break;
    case 100:
      setVars(400, "Malformed id!");
      break;
    default:
      return res.status(500).end();

  }

  return res.status(code).json({message});
};

module.exports = ErrorHandler;

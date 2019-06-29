
const ErrorHandler = (err, req, res, next) => {
  console.log(err.stack);

  switch (err.code) {
    case 11000:
      return res.status(400).json({ message: 'Name must be unique!' });
    default:
      return res.status(500).end();
  }

};

module.exports = ErrorHandler;

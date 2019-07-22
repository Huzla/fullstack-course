const CrendetialsError = () => {
  let err = Error("Incorrect userid or password");
  err.name = "CredentialsError";
  return err;
};

module.exports = CrendetialsError;

const NotFoundError = (resourceType) => {
  let err = Error("Resource not found");
  err.name = "NoResourceError";
  err.errors[resourceType] = {
      message: `Could not find ${ resourceType } with the given id.`,
      kind: "not found"
    }
  return err;
}

module.exports = NotFoundError;

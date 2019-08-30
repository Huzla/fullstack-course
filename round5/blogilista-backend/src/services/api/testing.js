const models = require("../../models");

const reset = () => Promise.all(Object.values(models).map(model => model.deleteMany({})));

module.exports = {
  reset
};

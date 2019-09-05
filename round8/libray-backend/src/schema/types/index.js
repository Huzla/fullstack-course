module.exports = require("fs")
  .readdirSync(__dirname)
  .filter(str => str !== "index.js")
  .map(str => require("./" + str));

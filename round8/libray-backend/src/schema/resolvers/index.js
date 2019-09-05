require("fs")
  .readdirSync(__dirname)
  .filter(str => str !== "index.js")
  .forEach(str => { exports[str] = require("./" + str) });

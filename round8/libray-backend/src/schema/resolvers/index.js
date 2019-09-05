require("fs")
  .readdirSync(__dirname)
  .filter(str => /^(.(?!\.js$))+$/.test(str))
  .forEach(str => { exports[str] = require("./" + str) });

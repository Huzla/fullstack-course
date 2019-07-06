//const https = require("https");
const http = require("http");
const { app } = require("./src/utils");
const { PORT } = require("./src/utils").config;

const server = http.createServer(app)

/*const options = {
  cert: ... ,
  key: ...
};

 const server = https.createServer(options, app);
*/

server.listen(PORT, () => {
  console.log(`Server running on port ${ PORT }`)
});

server.on("close", () => {
  console.log("Server closes");
});

process.on("SIGINT", () => {
  server.close(() => process.exit(0));
});

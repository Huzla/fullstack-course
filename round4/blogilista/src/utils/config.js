require("dotenv").config();

let MONGO_URI = process.env.MONGO_URI || "MONGO_URI=mongodb://localhost/bloglist";

if (process.env.NODE_ENV === 'test')
  MONGO_URI = process.env.TEST_MONGO_URI;

const PORT = process.env.PORT || 4000;

module.exports = {
  MONGO_URI,
  PORT
}

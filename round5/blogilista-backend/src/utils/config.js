require("dotenv").config();

let MONGO_URI = process.env.MONGO_URI || "MONGO_URI=mongodb://localhost/bloglist";

if (process.env.NODE_ENV === 'test')
  MONGO_URI = process.env.TEST_MONGO_URI || "MONGO_URI=mongodb://localhost/bloglistTest";

const PORT = process.env.PORT || 3003;

const PASS_LENGTH = (!process.env.PASS_LENGTH || process.env.PASS_LENGTH < 3) ? 3 : process.env.PASS_LENGTH;
const USERID_LENGTH = (!process.env.USERID_LENGTH || process.env.PASS_LENGTH < 3) ? 3 : process.env.USERID_LENGTH;

const TOKEN_SECRET = process.env.TOKEN_SECRET || "secret";

module.exports = {
  MONGO_URI,
  PORT,
  PASS_LENGTH,
  USERID_LENGTH,
  TOKEN_SECRET
}

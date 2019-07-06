require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI || "MONGO_URI=mongodb://localhost/bloglist";
const PORT = process.env.PORT || 4000;

module.exports = {
  MONGO_URI,
  PORT
}

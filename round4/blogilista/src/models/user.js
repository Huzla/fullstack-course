const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  userId: { type: String, required: true, unique: true },
  blogs: [{ type: ObjectId, ref: "Blog" }],
  password: { type: String, required: true }
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

userSchema.plugin(uniqueValidator);

const User = mongoose.model("User", userSchema);

module.exports = User;

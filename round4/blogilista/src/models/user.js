const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  userId: { type: String, required: true },
  pass: { type: String, required: true }
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;

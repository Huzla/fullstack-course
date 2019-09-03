require("dotenv").config();
const mongoose = require("mongoose");
const models = require("./src/models");

mongoose.set("useFindAndModify", false);

mongoose.connect( process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => {
    try {
      Promise.all(Object.values(models).map(model => {
        console.log(model);
        return model.deleteMany({});
      }))
      .then(() => {
        console.log("done");
      })
      .catch((err) => {
        console.log(err.stack);
      });
    }
    catch (err) {
      console.log(err.stack);
    }
  });

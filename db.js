const mongoose = require("mongoose");

const uri = "mongodb://127.0.0.1:27017/cats";
mongoose
  .connect(uri, { useNewUrlParser: true })
  .then(() => {
    console.log("good connection...");
  })
  .catch((err) => {
    console.log("bad connection...", err);
  });

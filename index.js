const express = require("express");
const app = express();
const server = app.listen(4494, () => {
  console.log("server started on port", server.address().port);
});

app.get("/hello", (req, res) => {
  res.send("Howdy, world!");
});

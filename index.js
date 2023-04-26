const express = require("express");
const app = express();
require("./db");
// Example of middlewware
// Parses body of requests and responses to JSON
app.use(express.json());

const logger = (req, res, next) => {
  console.log("host:", req.host);
  console.log("method:", req.method);
  console.log("path:", req.path);
  // Move to next function being called
  // `return` keyword to stop this function
  return next();
};

// No path - will always run for all requests
app.use(logger);

const catRoutes = require("./routes/cats");

// Prefixes request path with `/cats`
app.use("/cats", catRoutes);

app.get("/hello", (req, res) => {
  res.send("Howdy, world!");
});

// Need 4 parameters for error handling
// So JS knows the first one is the error
app.use((err, req, res, next) => {
  res.status(err.status).send(err.msg);
});

// app.listen() is always last
const server = app.listen(4494, () => {
  console.log("server started on port", server.address().port);
});

module.exports = server;

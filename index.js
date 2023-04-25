const express = require("express");
const app = express();
// Example of middlewware
// Parses body of requests and responses to JSON
app.use(express.json());

const cats = [];

app.get("/getAll", (req, res) => {
  // Alternative to res.send() but also converts non-objects to JSON
  res.json(cats);
});

app.post("/create", (req, res) => {
  const newCat = req.body;
  cats.push(newCat);
  res.status(201).json(cats[cats.length - 1]);
});

app.get("/hello", (req, res) => {
  res.send("Howdy, world!");
});

const server = app.listen(4494, () => {
  console.log("server started on port", server.address().port);
});

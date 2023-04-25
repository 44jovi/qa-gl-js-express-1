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

app.delete("/remove/:id", (req, res) => {
  // Deconstructs request parameters to get id
  const { id } = req.params;
  // Delete 1 item from the array at index of the id
  // Returns array of the deleted item
  const removed = cats.splice(id, 1);
  res.json(removed);
});

app.patch("/update/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.query;
  const catToUpdate = cats[id];
  catToUpdate.name = name;
  res.json(catToUpdate);
});

app.get("/hello", (req, res) => {
  res.send("Howdy, world!");
});

const server = app.listen(4494, () => {
  console.log("server started on port", server.address().port);
});

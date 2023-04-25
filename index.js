const express = require("express");
const app = express();
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

app.patch("/update/:id", (req, res, next) => {
  const { id } = req.params;
  if (id >= cats.length) {
    return next({
      msg: "ID out of bounds",
      // `status` keyword calls Express' default error handler
      // So it will throw 404 by default without using our own custom error handler
      status: 404,
    });
  }
  const { name } = req.query;
  const catToUpdate = cats[id];
  catToUpdate.name = name;
  res.json(catToUpdate);
});

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

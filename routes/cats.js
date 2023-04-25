const router = require("express").Router();

const cats = [];

router.get("/getAll", (req, res) => {
  res.json(cats);
});

router.post("/create", (req, res) => {
  const newCat = req.body;
  cats.push(newCat);
  res.status(201).json(cats[cats.length - 1]);
});

router.delete("/remove/:id", (req, res) => {
  // Deconstructs request parameters to get id
  const { id } = req.params;
  // Delete 1 item from the array at index of the id
  // Returns array of the deleted item
  const removed = cats.splice(id, 1);
  res.json(removed);
});

router.patch("/update/:id", (req, res) => {
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

module.exports = router;

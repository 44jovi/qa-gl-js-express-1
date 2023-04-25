const router = require("express").Router();
const { catModel } = require("../db");

const cats = [];

router.get("/getAll", async (req, res, next) => {
  try {
    const catsFound = await catModel.find();
    res.json(catsFound);
  } catch (err) {
    return next({
      status: 404,
      msg: "error! not found!",
    });
  }
});

router.post("/create", async ({ body }, res, next) => {
  try {
    const created = await catModel.create(body);
    res.status(201).json(created);
  } catch (err) {
    return next({
      status: 500,
      msg: "oh, dear, nope - try again...",
    });
  }
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

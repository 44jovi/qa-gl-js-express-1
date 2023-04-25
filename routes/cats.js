const router = require("express").Router();
const { catModel } = require("../db");

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

router.delete("/remove/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const catRemoved = await catModel.deleteOne({
      _id: id,
    });
    res.status(201).json(catRemoved);
  } catch (err) {
    return next({
      status: 404,
      msg: "cat not removed!",
    });
  }
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

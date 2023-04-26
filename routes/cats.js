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

router.patch("/update/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const catUpdated = await catModel.findByIdAndUpdate(id, req.query, {
      // Use "after" to return document *after* it is updated
      returnDocument: "after",
    });
    res.status(201).json(catUpdated);
  } catch (err) {
    return next({
      status: 404,
      msg: "cat not updated!",
    });
  }
});

module.exports = router;

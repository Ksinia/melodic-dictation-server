const { Router } = require("express");
const Melody = require("../melody/model");
const authMiddleware = require("../auth/middleware");

const router = new Router();

router.post("/melody", authMiddleware, async (req, res, next) => {
  const user = req.user;
  try {
    const melody = await Melody.create({ ...req.body, userId: user.id });
    res.send(melody);
  } catch (error) {
    next(error);
  }
});

router.get("/melody", async (req, res, next) => {
  try {
    const result = await Melody.findAll();
    res.send(result);
  } catch (error) {
    next(error);
  }
});

router.get("/melody/:id", async (req, res, next) => {
  try {
    const melody = await Melody.findByPk(req.params.id);

    res.send(melody);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

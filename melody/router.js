const { Router } = require("express");
const Melody = require("../melody/model");
const authMiddleware = require("../auth/middleware");
const { convert, convertMidiToAbc } = require("./converter");
const Dictation = require("../dictation/model");
const Sequelize = require("sequelize");

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
    const result = await Melody.findAll({
      order: [["id", "ASC"]],

      attributes: {
        include: [
          [
            Sequelize.fn("COUNT", Sequelize.col("dictations.id")),
            "dictationsCount"
          ]
        ]
      },
      include: [
        {
          model: Dictation,
          attributes: []
        }
      ],
      group: ["melody.id"]
    });
    res.send(result);
  } catch (error) {
    next(error);
  }
});

router.get("/melody/:id", async (req, res, next) => {
  try {
    const melody = await Melody.findByPk(req.params.id);
    const abc = await convert("." + melody.url);
    res.send({ ...melody.dataValues, abc });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

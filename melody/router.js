const { Router } = require("express");
const { Sequelize, Melody, Dictation } = require("../models");
const authMiddleware = require("../auth/middleware");
const convert = require("./converter");
const createMelody = require("./create-melody");

const router = new Router();

router.post("/melody", authMiddleware, createMelody);

router.get("/melody", async (req, res, next) => {
  try {
    const result = await Melody.findAll({
      order: [["id", "ASC"]],

      attributes: {
        include: [[Sequelize.fn("COUNT", Sequelize.col("Dictations.id")), "dictationsCount"]]
      },
      include: [
        {
          model: Dictation,
          attributes: []
        }
      ],
      group: ["Melody.id"]
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

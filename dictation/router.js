const { Router } = require("express");
const {
  Dictation,
  Melody,
  Sequelize: { Op },
} = require("../models");
const authMiddleware = require("../auth/middleware");
const validaton = require("./validation");
const router = new Router();

// start a new dictation
router.post(
  "/melody/:melodyId/dictation",
  authMiddleware,
  async (req, res, next) => {
    const { id: userId } = req.user;
    const { melodyId } = req.params;
    try {
      const dictation = await Dictation.create({
        melodyId,
        userId,
      });
      res.send(dictation);
    } catch (error) {
      next(error);
    }
  }
);

// get all dictations for this melody for this user
router.get(
  "/melody/:melodyId/dictation",
  authMiddleware,
  async (req, res, next) => {
    const user = req.user;
    try {
      const dictation = await Dictation.findAll({
        where: { melodyId: req.params.melodyId, userId: user.id },
      });
      res.send(dictation);
    } catch (error) {
      next(error);
    }
  }
);
// get stats for previous dictations for this melody for this user
router.get(
  "/melody/:melodyId/stats",
  authMiddleware,
  async (req, res, next) => {
    const { id: userId } = req.user;
    const { melodyId } = req.params;
    try {
      const all = await Dictation.count({
        where: { melodyId, userId },
      });
      const finished = await Dictation.count({
        where: {
          melodyId,
          userId,
          score: { [Op.ne]: null },
        },
      });
      // const successful = 100;
      const successful = await Dictation.count({
        where: {
          melodyId,
          userId,
          score: 100,
        },
      });
      res.send({ all, finished, successful });
    } catch (error) {
      next(error);
    }
  }
);

// get a certain dictations (for this user)
router.get(
  "/melody/:melodyId/dictation/:dictationId",
  authMiddleware,
  async (req, res, next) => {
    try {
      const dictation = await Dictation.findByPk(req.params.dictationId);
      res.send(dictation);
    } catch (error) {
      next(error);
    }
  }
);

// submit user input for certain dictation (for this user)
router.put(
  "/melody/:melodyId/dictation/:dictationId",
  authMiddleware,
  async (req, res, next) => {
    const user = req.user;
    try {
      const dictation = await Dictation.findByPk(req.params.dictationId, {
        include: Melody,
      });
      if (dictation.userId === user.id) {
        const result = validaton(dictation.Melody.abcNotes, req.body.userInput);
        let scorePercent = Math.round(
          (result.filter(Boolean).length / result.length) * 100
        );
        const updatedDictation = await dictation.update({
          inputObject: req.body.userInput,
          score: scorePercent,
        });
        res.send({ ...updatedDictation.dataValues, result: result });
      } else {
        res.status(400).send({
          message: "You are not allowed to change this dictation",
        });
      }
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;

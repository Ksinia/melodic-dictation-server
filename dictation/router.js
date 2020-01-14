const { Router } = require("express");
const Dictation = require("../dictation/model");
const authMiddleware = require("../auth/middleware");
const validaton = require("./validation");
const Melody = require("../melody/model");

const router = new Router();

// start a new dictation
router.post(
  "/melody/:melodyId/dictation",
  authMiddleware,
  async (req, res, next) => {
    const user = req.user;
    try {
      const dictation = await Dictation.create({
        melodyId: req.params.melodyId,
        userId: user.id
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
        where: { melodyId: req.match.params.melodyId, userId: user.id }
      });
      res.send(dictation);
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
        include: Melody
      });
      if (dictation.userId == user.id) {
        // later there will be a logic for validating user input instead of saving input into db
        // and score will be sent to the user
        const result = validaton(dictation.melody.abcNotes, req.body.userInput);
        let scorePercent =
          (result.filter(Boolean).length / result.length) * 100;
        const updatedDictation = await dictation.update({
          inputObject: req.body.userInput,
          score: scorePercent
        });
        res.send({ ...updatedDictation.dataValues, result: result });
      } else {
        res.status(400).send({
          message: "You are not allowed to change this dictation"
        });
      }
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;

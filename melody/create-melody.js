const { Melody } = require("../models");

module.exports = async (req, res, next) => {
  const user = req.user;

  try {
    const melody = await Melody.create({ ...req.body, userId: user.id });

    res.send(melody);
  } catch (error) {
    next(error);
  }
};

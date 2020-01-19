const db = require("../models");
const Melody = require("../melody/model");
const User = require("../user/model");

const Dictation = db.sequelize.define("dictation", {
  score: db.Sequelize.INTEGER,
  inputObject: db.Sequelize.JSON
});

Dictation.belongsTo(User);
Dictation.belongsTo(Melody);
User.hasMany(Dictation);
Melody.hasMany(Dictation);
Melody.belongsTo(User);

module.exports = Dictation;

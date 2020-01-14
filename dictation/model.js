const Sequelize = require("sequelize");
const db = require("../db");
const Melody = require("../melody/model");
const User = require("../user/model");

const Dictation = db.define("dictation", {
  score: Sequelize.INTEGER,
  inputObject: Sequelize.JSON
});

Dictation.belongsTo(User);
Dictation.belongsTo(Melody);
User.hasMany(Dictation);
Melody.hasMany(Dictation);
Melody.belongsTo(User);

module.exports = Dictation;

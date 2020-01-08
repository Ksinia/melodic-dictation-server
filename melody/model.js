const Sequelize = require("sequelize");
const db = require("../db");

const Melody = db.define("melody", {
  name: Sequelize.STRING,
  url: Sequelize.STRING,
  description: Sequelize.STRING,
  level: Sequelize.INTEGER
});

module.exports = Melody;

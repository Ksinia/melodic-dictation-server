const Sequelize = require("sequelize");
const db = require("../db");
const melodies = require("./data");

const Melody = db.define("melody", {
  name: Sequelize.STRING,
  url: Sequelize.STRING,
  description: Sequelize.STRING,
  level: Sequelize.INTEGER,
  abcStart: Sequelize.STRING,
  abcNotes: Sequelize.JSON
});

Melody.count().then(count => {
  if (count === 0) {
    melodies.map(melody => Melody.create(melody));
  }
});
module.exports = Melody;

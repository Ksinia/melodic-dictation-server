const db = require("../models");
const melodies = require("./data");

const Melody = db.sequelize.define("melody", {
  name: db.Sequelize.STRING,
  url: db.Sequelize.STRING,
  description: db.Sequelize.STRING,
  level: db.Sequelize.INTEGER,
  abcStart: db.Sequelize.STRING,
  abcNotes: db.Sequelize.JSON
});

Melody.count().then(count => {
  if (count === 0) {
    melodies.map(melody => Melody.create(melody));
  }
});
module.exports = Melody;

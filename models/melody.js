"use strict";
// const melodies = require("./data");

module.exports = (sequelize, DataTypes) => {
  const Melody = sequelize.define(
    "Melody",
    {
      name: DataTypes.STRING,
      url: DataTypes.STRING,
      description: DataTypes.STRING,
      level: DataTypes.INTEGER,
      abcStart: DataTypes.STRING,
      abcNotes: DataTypes.JSON
    },
    { tableName: "melodies" }
  );
  Melody.associate = function(models) {
    Melody.hasMany(models.Dictation);
    Melody.belongsTo(models.User);
  };
  // Melody.count().then(count => {
  //   if (count === 0) {
  //     melodies.map(melody => Melody.create(melody));
  //   }
  // });
  return Melody;
};

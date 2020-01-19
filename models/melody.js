"use strict";

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
  return Melody;
};

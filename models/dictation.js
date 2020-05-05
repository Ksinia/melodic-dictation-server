"use strict";

module.exports = (sequelize, DataTypes) => {
  const Dictation = sequelize.define(
    "Dictation",
    {
      score: DataTypes.INTEGER,
      inputObject: DataTypes.JSON,
    },
    { tableName: "dictations" }
  );
  Dictation.associate = function (models) {
    Dictation.belongsTo(models.User, {
      foreignKey: {
        name: "userId",
      },
    });
    Dictation.belongsTo(models.Melody, {
      foreignKey: {
        name: "melodyId",
      },
    });
  };
  return Dictation;
};

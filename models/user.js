"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      name: DataTypes.STRING,
      password: DataTypes.STRING
    },
    { tableName: "users" }
  );
  User.associate = function(models) {
    User.hasMany(models.Dictation, {
      foreignKey: {
        name: "userId"
      }
    });
  };
  return User;
};

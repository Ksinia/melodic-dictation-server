const Sequelize = require("sequelize");
const db = require("../db");

const User = db.define("user", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      len: {
        args: [1, 99],
        msg: "Username should not be empty"
      }
    }
  },
  password: { type: Sequelize.STRING, allowNull: false }
});

module.exports = User;

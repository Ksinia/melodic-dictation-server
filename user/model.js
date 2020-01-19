const db = require("../models");

const User = db.sequelize.define("user", {
  name: {
    type: db.Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      len: {
        args: [1, 99],
        msg: "Username should not be empty"
      }
    }
  },
  password: { type: db.Sequelize.STRING, allowNull: false }
});

module.exports = User;

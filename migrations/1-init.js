"use strict";

var Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * createTable "users", deps: []
 * createTable "melodies", deps: [users]
 * createTable "dictations", deps: [users, melodies]
 *
 **/

var info = {
  revision: 1,
  name: "noname",
  created: "2020-01-19T22:04:51.196Z",
  comment: ""
};

var migrationCommands = function(transaction) {
  return [
    {
      fn: "createTable",
      params: [
        "users",
        {
          id: {
            type: Sequelize.INTEGER,
            field: "id",
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
          },
          name: {
            type: Sequelize.STRING,
            field: "name"
          },
          password: {
            type: Sequelize.STRING,
            field: "password"
          },
          createdAt: {
            type: Sequelize.DATE,
            field: "createdAt",
            allowNull: false
          },
          updatedAt: {
            type: Sequelize.DATE,
            field: "updatedAt",
            allowNull: false
          }
        },
        {
          transaction: transaction
        }
      ]
    },
    {
      fn: "createTable",
      params: [
        "melodies",
        {
          id: {
            type: Sequelize.INTEGER,
            field: "id",
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
          },
          name: {
            type: Sequelize.STRING,
            field: "name"
          },
          url: {
            type: Sequelize.STRING,
            field: "url"
          },
          description: {
            type: Sequelize.STRING,
            field: "description"
          },
          level: {
            type: Sequelize.INTEGER,
            field: "level"
          },
          abcStart: {
            type: Sequelize.STRING,
            field: "abcStart"
          },
          abcNotes: {
            type: Sequelize.JSON,
            field: "abcNotes"
          },
          createdAt: {
            type: Sequelize.DATE,
            field: "createdAt",
            allowNull: false
          },
          updatedAt: {
            type: Sequelize.DATE,
            field: "updatedAt",
            allowNull: false
          },
          userId: {
            type: Sequelize.INTEGER,
            field: "userId",
            onUpdate: "CASCADE",
            onDelete: "SET NULL",
            references: {
              model: "users",
              key: "id"
            },
            allowNull: true,
            name: "userId"
          }
        },
        {
          transaction: transaction
        }
      ]
    },
    {
      fn: "createTable",
      params: [
        "dictations",
        {
          id: {
            type: Sequelize.INTEGER,
            field: "id",
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
          },
          score: {
            type: Sequelize.INTEGER,
            field: "score"
          },
          inputObject: {
            type: Sequelize.JSON,
            field: "inputObject"
          },
          createdAt: {
            type: Sequelize.DATE,
            field: "createdAt",
            allowNull: false
          },
          updatedAt: {
            type: Sequelize.DATE,
            field: "updatedAt",
            allowNull: false
          },
          userId: {
            type: Sequelize.INTEGER,
            field: "userId",
            onUpdate: "CASCADE",
            onDelete: "SET NULL",
            references: {
              model: "users",
              key: "id"
            },
            allowNull: true,
            name: "userId"
          },
          melodyId: {
            type: Sequelize.INTEGER,
            field: "melodyId",
            onUpdate: "CASCADE",
            onDelete: "SET NULL",
            references: {
              model: "melodies",
              key: "id"
            },
            allowNull: true,
            name: "melodyId"
          }
        },
        {
          transaction: transaction
        }
      ]
    }
  ];
};
var rollbackCommands = function(transaction) {
  return [
    {
      fn: "dropTable",
      params: [
        "dictations",
        {
          transaction: transaction
        }
      ]
    },
    {
      fn: "dropTable",
      params: [
        "melodies",
        {
          transaction: transaction
        }
      ]
    },
    {
      fn: "dropTable",
      params: [
        "users",
        {
          transaction: transaction
        }
      ]
    }
  ];
};

module.exports = {
  pos: 0,
  useTransaction: true,
  execute: function(queryInterface, Sequelize, _commands) {
    var index = this.pos;
    function run(transaction) {
      const commands = _commands(transaction);
      return new Promise(function(resolve, reject) {
        function next() {
          if (index < commands.length) {
            let command = commands[index];
            console.log("[#" + index + "] execute: " + command.fn);
            index++;
            queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
          } else resolve();
        }
        next();
      });
    }
    if (this.useTransaction) {
      return queryInterface.sequelize.transaction(run);
    } else {
      return run(null);
    }
  },
  up: function(queryInterface, Sequelize) {
    return this.execute(queryInterface, Sequelize, migrationCommands);
  },
  down: function(queryInterface, Sequelize) {
    return this.execute(queryInterface, Sequelize, rollbackCommands);
  },
  info: info
};

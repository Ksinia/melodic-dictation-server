'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "SequelizeMeta", deps: []
 * changeColumn "password" on table "users"
 * changeColumn "name" on table "users"
 *
 **/

var info = {
    "revision": 2,
    "name": "noname",
    "created": "2020-02-04T19:17:34.109Z",
    "comment": ""
};

var migrationCommands = function(transaction) {
    return [{
            fn: "createTable",
            params: [
                "SequelizeMeta",
                {
                    "name": {
                        "type": Sequelize.STRING,
                        "field": "name",
                        "autoIncrement": false,
                        "primaryKey": true,
                        "unique": true,
                        "allowNull": false
                    }
                },
                {
                    "charset": "utf8",
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "changeColumn",
            params: [
                "users",
                "password",
                {
                    "type": Sequelize.STRING,
                    "field": "password",
                    "allowNull": false
                },
                {
                    transaction: transaction
                }
            ]
        },
        {
            fn: "changeColumn",
            params: [
                "users",
                "name",
                {
                    "type": Sequelize.STRING,
                    "field": "name",
                    "unique": true,
                    "allowNull": false
                },
                {
                    transaction: transaction
                }
            ]
        }
    ];
};
var rollbackCommands = function(transaction) {
    return [{
            fn: "dropTable",
            params: ["SequelizeMeta", {
                transaction: transaction
            }]
        },
        {
            fn: "changeColumn",
            params: [
                "users",
                "password",
                {
                    "type": Sequelize.STRING,
                    "field": "password"
                },
                {
                    transaction: transaction
                }
            ]
        },
        {
            fn: "changeColumn",
            params: [
                "users",
                "name",
                {
                    "type": Sequelize.STRING,
                    "field": "name"
                },
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
    execute: function(queryInterface, Sequelize, _commands)
    {
        var index = this.pos;
        function run(transaction) {
            const commands = _commands(transaction);
            return new Promise(function(resolve, reject) {
                function next() {
                    if (index < commands.length)
                    {
                        let command = commands[index];
                        console.log("[#"+index+"] execute: " + command.fn);
                        index++;
                        queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                    }
                    else
                        resolve();
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
    up: function(queryInterface, Sequelize)
    {
        return this.execute(queryInterface, Sequelize, migrationCommands);
    },
    down: function(queryInterface, Sequelize)
    {
        return this.execute(queryInterface, Sequelize, rollbackCommands);
    },
    info: info
};

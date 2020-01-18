const { Router } = require("express");
const { User } = require("../models");
const bcrypt = require("bcrypt");
const { login } = require("../auth/router");

const router = new Router();

router.post("/signup", (req, res, next) => {
  if (!req.body.password) {
    res.status(400).send({
      message: "Password should not be empty"
    });
    return;
  }
  const user = {
    name: req.body.name,
    password: bcrypt.hashSync(req.body.password, 10)
  };
  User.findOne({ where: { name: req.body.name } }).then(data => {
    if (data) {
      res.status(400).send({
        message: "This name is already in use"
      });
    } else {
      User.create(user)
        .then(user => login(res, next, user.name, req.body.password))
        .catch(error => {
          if (error.name === "SequelizeValidationError") {
            console.log("Error errors[0] type:", typeof error.errors[0]);
            console.log(
              "errors[0] class name:",
              error.errors[0].constructor.name
            );
            res.status(400).send({
              message: error.errors[0].message
            });
          } else {
            next(error);
          }
        });
    }
  });
});

module.exports = router;

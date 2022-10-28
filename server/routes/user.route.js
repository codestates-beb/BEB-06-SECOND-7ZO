const express = require("express");

const usersController = require("../controllers/users.controllers");

const router = express.Router();

router.get("/:uid", usersController.userInfo);

router.post("/login", usersController.login);

router.post("/:uid", usersController.join);

module.exports = router;
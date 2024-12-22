const express = require("express");
const router = express.Router();
const { registerUser, checkUser } = require("../Controllers/Authentication.js");

router.post("/register", registerUser);

router.post("/login", checkUser);

module.exports = router;

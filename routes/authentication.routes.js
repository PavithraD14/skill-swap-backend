const express = require("express");
const router = express.Router();

const authentication = require("../security/authentication.security");


router.post("/register", authentication.registerUser);

router.post("/login", authentication.loginUser);


module.exports = router;

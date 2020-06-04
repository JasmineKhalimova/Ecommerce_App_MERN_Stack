const express = require("express");
const router = express.Router();

const { signup, signin, signout, requireSignin} = require("../controllers/auth");
const { userSignupValidator } = require("../validator");

router.post("/signup", userSignupValidator, signup); // USER CREATE
router.post("/signin", signin); // USER SIGNIN
router.get("/signout", signout); // USER READ

module.exports = router;

const express = require("express");
const router = express.Router();
const{requireSignin, isAuth} = require("../controllers/auth");
const{userById} = require("../controllers/user");
const{generateToken} = require("../controllers/braintree");

router.get("/braintree/getToken/:userId", requireSignin, isAuth, generateToken); // Read - pulling braintree credentials info

router.param("userId", userById);

module.exports = router

const express = require("express");
const router = express.Router();
const{userById, read, update} = require("../controllers/user"); // defining variables
const{requireSignin, isAuth, isAdmin} = require("../controllers/auth");

router.get("/secret/:userId", requireSignin, isAuth, isAdmin, (req, res) => {
    res.json({
        user: req.profile
    });
});

router.get("/user/:userId", requireSignin, isAuth, read); // Read - pulling user info
router.put("/user/:userId", requireSignin, isAuth, update) // Update - updating user info

router.param("userId", userById);

module.exports = router;
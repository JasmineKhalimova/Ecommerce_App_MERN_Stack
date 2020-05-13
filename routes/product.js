const express = require("express");
const router = express.Router();
const{ create, productById, read, remove } = require("../controllers/product");
const{userById} = require("../controllers/user");
const{requireSignin, isAuth, isAdmin} = require("../controllers/auth");


router.post("/product/create/:userId", requireSignin, isAdmin, isAuth, create);// Create
router.get("/product/:productId", read);// Read
router.delete("/product/:productId/:userId", requireSignin, isAdmin, isAuth, remove);


router.param("userId", userById);
router.param("productId", productById);

module.exports = router;
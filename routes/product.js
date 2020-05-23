const express = require("express");
const router = express.Router();
const{ create, productById, read, remove, update, list, listRealated, listCategories, listBySearch, listSearch, photo } = require("../controllers/product"); // Defining all the variables 
const{userById} = require("../controllers/user");
const{requireSignin, isAuth, isAdmin} = require("../controllers/auth");

// Product Routes
router.post("/product/create/:userId", requireSignin, isAdmin, isAuth, create);// Create
router.get("/product/:productId", read);// Read
router.put("/product/:productId/:userId", requireSignin, isAdmin, isAuth, update); //Update
router.delete("/product/:productId/:userId", requireSignin, isAdmin, isAuth, remove); // Delete

router.get("/products", list);// making request to get all products in list format
router.get("/products/related/:productId", listRealated); // getting related products 
router.get("/products/categories", listCategories); // getting all the product category list
router.get("/products/search", listSearch); // getting products by search method 
router.post("/products/by/search", listBySearch); // getting products by list search method 
router.get("/product/photo/:productId", photo); // getting product photo


router.param("userId", userById);
router.param("productId", productById);


module.exports = router;
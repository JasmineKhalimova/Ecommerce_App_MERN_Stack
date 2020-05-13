const express = require("express");
const router = express.Router();
const{ create, categoryById, read, update, remove, list } = require("../controllers/category");
const{ userById } = require("../controllers/user");
const{ requireSignin, isAuth, isAdmin } = require("../controllers/auth");



router.post("/category/create/:userId", requireSignin, isAdmin, isAuth, create);//Create
router.get("/category/:categoryId", read);// Read
router.put('/category/:categoryId/:userId', requireSignin, isAuth, isAdmin, update);// Update
router.delete('/category/:categoryId/:userId', requireSignin, isAuth, isAdmin, remove);// Delete
router.get("/categories", list);// Delete

router.param("userId", userById);
router.param("categoryId", categoryById);

module.exports = router;
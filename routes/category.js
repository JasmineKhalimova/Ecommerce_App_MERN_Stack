const express = require('express');
const router = express.Router();

const { create, categoryById, read, update, remove, list } = require('../controllers/category');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');

router.post('/category/create/:userId', requireSignin, isAuth, isAdmin, create);// CREATE
router.get('/category/:categoryId', read); // READ
router.put('/category/:categoryId/:userId', requireSignin, isAuth, isAdmin, update); // UPDATE
router.delete('/category/:categoryId/:userId', requireSignin, isAuth, isAdmin, remove); // DELTE
router.get('/categories', list); // GETTING ALL THE CATEGORIES IN LIST

router.param('categoryId', categoryById);
router.param('userId', userById);

module.exports = router;

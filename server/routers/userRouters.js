const express = require('express');
const UserController = require('../controllers/userController');
const router = express.Router();

router.get('/items', UserController.showItems);
router.get('/items/:id/detail', UserController.itemDetail);

module.exports = router;

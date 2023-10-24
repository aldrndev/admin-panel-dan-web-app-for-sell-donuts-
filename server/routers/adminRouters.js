const express = require('express');
const AdminController = require('../controllers/adminController');
const { authenticate } = require('../middlewares/guard');
const router = express.Router();

router.post('/login', AdminController.login);

router.use(authenticate);
router.get('/items', AdminController.showItems);
router.post('/items/add', AdminController.addItem);
router.put('/items/:id/edit', AdminController.editItem);
router.delete('/items/:id/delete', AdminController.deleteItem);
router.get('/items/:id/detail', AdminController.detailItem);

router.get('/categories', AdminController.showCategories);
router.post('/categories/add', AdminController.addCategory);
router.delete('/categories/:id/delete', AdminController.deleteCategory);

router.post('/register', AdminController.registerAdmin);

router.get('/:id/ingredients', AdminController.showIngredients);

module.exports = router;

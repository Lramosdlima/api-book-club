const { Router } = require('express');
const { UserController } = require('../controllers/user');

const router = Router();

const userController = new UserController();

router.get('/all', userController.getAll);
router.get('/:id', userController.getById);
router.post('/create', userController.create);
router.put('/update/:id', userController.update);
router.delete('/delete/:id', userController.exclude);

module.exports = router;
const { Router } = require('express');
const { RoleController } = require('../controllers/role');

const router = Router();

const roleController = new RoleController();

router.get('/all', roleController.getAll);
router.get('/:id', roleController.getById);
router.post('/create', roleController.create);
router.put('/update/:id', roleController.update);
router.delete('/delete/:id', roleController.exclude);

module.exports = router;
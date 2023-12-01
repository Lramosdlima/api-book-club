const { Router } = require('express');
const { CommunityUserController } = require('../controllers/communityUser');

const router = Router();

const communityUserController = new CommunityUserController();

router.get('/all', communityUserController.getAll);
router.get('/:id', communityUserController.getById);
router.post('/create', communityUserController.create);
router.put('/update/:id', communityUserController.update);
router.delete('/delete/:id', communityUserController.exclude);

module.exports = router;
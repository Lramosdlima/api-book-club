const { Router } = require('express');
const { CommunityController } = require('../controllers/community');

const router = Router();

const communityController = new CommunityController();

router.get('/all', communityController.getAll);
router.get('/:id', communityController.getById);
router.post('/create', communityController.create);
router.put('/update/:id', communityController.update);
router.delete('/delete/:id', communityController.exclude);

module.exports = router;
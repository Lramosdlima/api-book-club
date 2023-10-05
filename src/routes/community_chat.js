const { Router } = require('express');
const { CommunityChatController } = require('../controllers/community_chat');

const router = Router();

const communityChatController = new CommunityChatController();

router.get('/all', communityChatController.getAll);
router.get('/:id', communityChatController.getById);
router.post('/create', communityChatController.create);
router.put('/update/:id', communityChatController.update);
router.delete('/delete/:id', communityChatController.exclude);

module.exports = router;
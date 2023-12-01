const { Router } = require('express');
const { AuthorBookController } = require('../controllers/authorBook');

const router = Router();

const authorBookController = new AuthorBookController();

router.get('/all', authorBookController.getAll);
router.get('/all/complete', authorBookController.getAllWithCompleteInfo);
router.get('/:id', authorBookController.getById);
router.post('/create', authorBookController.create);
router.put('/update/:id', authorBookController.update);
router.delete('/delete/:id', authorBookController.exclude);

module.exports = router;
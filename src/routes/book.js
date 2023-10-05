const { Router } = require('express');
const { BookController } = require('../controllers/book');

const router = Router();

const bookController = new BookController();

router.get('/all', bookController.getAll);
router.get('/:id', bookController.getById);
router.post('/create', bookController.create);
router.put('/update/:id', bookController.update);
router.delete('/delete/:id', bookController.exclude);

module.exports = router;
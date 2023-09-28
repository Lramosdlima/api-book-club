const { Router } = require('express');
const { BookController } = require('../controllers/book');

const router = Router();

const bookController = new BookController();

router.get('/all', bookController.getAll);

module.exports = router;
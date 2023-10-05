const { Router } = require('express');
const { GenreController } = require('../controllers/genre');

const router = Router();

const genreController = new GenreController();

router.get('/all', genreController.getAll);
router.get('/:id', genreController.getById);
router.post('/create', genreController.create);
router.put('/update/:id', genreController.update);
router.delete('/delete/:id', genreController.exclude);

module.exports = router;
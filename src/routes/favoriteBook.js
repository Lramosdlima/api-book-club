const { Router } = require('express');
const { FavoriteBookController } = require('../controllers/favoriteBook');

const router = Router();

const favoriteBookController = new FavoriteBookController();

router.get('/all', favoriteBookController.getAllByUser);
router.get('/:id', favoriteBookController.getById);
router.post('/create', favoriteBookController.create);
router.put('/update/:id', favoriteBookController.update);
router.delete('/delete/:id', favoriteBookController.exclude);

module.exports = router;
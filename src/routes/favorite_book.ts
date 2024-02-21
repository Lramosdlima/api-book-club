import { Router } from 'express';

import { FavoriteBookController } from '../controllers/favoriteBook';

const router = Router();

const favoriteBookController = new FavoriteBookController();

router.get('/all', favoriteBookController.getAllByUser);
router.get('/:id', favoriteBookController.getById);
router.post('/create', favoriteBookController.create);
router.put('/update/:id', favoriteBookController.update);
router.delete('/delete/:id', favoriteBookController.exclude);

export default router;
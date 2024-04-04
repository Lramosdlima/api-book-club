import { Router } from 'express';

import { BookController } from '../controllers/book';
import { Middleware } from './middleware';

const router = Router();

const bookController = new BookController();
const middleware = new Middleware();

router.get('/all', bookController.getAll);
router.get('/all/complete', bookController.getAllWithCompleteInfo);
router.get('/:id', bookController.getById);
router.get('/search', bookController.getByTitle);

router.post('/create', middleware.auth, bookController.createWithAuthorExist);
router.post('/create/complete', middleware.auth, bookController.createWithCompleteInfo);

router.put('/update/:id', middleware.auth, bookController.update);
router.delete('/delete/:id', middleware.auth, bookController.exclude);

export default router;
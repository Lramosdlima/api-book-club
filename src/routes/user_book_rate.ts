import { Router } from 'express';

import { UserBookRateController } from '../controllers/user_book_rate';
import { Middleware } from './middleware';

const router = Router();

const userBookRateController = new UserBookRateController();
const middleware = new Middleware();

router.get('/all',  userBookRateController.getAll);
router.get('/:id',  userBookRateController.getById);
router.get('/by/book/:book_id',  userBookRateController.getAllByBookId);
router.get('/by/user/:user_id',  userBookRateController.getAllByUserId);

router.post('/create', middleware.auth, userBookRateController.create);

router.put('/update/:id', middleware.auth, userBookRateController.update);

router.delete('/delete/:id', middleware.auth, userBookRateController.exclude);

export default router;
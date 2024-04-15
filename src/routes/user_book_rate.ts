import { Router } from 'express';

import { UserBookRateController } from '../controllers/user_book_rate';

const router = Router();

const userBookRateController = new UserBookRateController();

router.get('/all',  userBookRateController.getAll);
router.get('/:id',  userBookRateController.getById);
router.get('/by/book/:book_id',  userBookRateController.getByBookId);
router.post('/create',  userBookRateController.create);
router.put('/update/:id',  userBookRateController.update);
router.delete('/delete/:id', userBookRateController.exclude);
export default router;
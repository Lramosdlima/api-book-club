import { Router } from 'express';

import { UserBookRateController } from '../controllers/user_book_rate';

const router = Router();

const UserBookRateController = new UserBookRateController();

router.get('/all', UserBookRateController.getAll);
router.get('/:id', UserBookRateController.getById);
router.get('/by/book/:book_id', UserBookRateController.getByBookId);
router.post('/create', UserBookRateController.create);
router.put('/update/:id', UserBookRateController.update);
router.delete('/delete/:id',UserBookRateController.exclude);
export default router;
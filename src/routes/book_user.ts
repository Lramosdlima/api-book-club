import { Router } from 'express';

import { BookUserController } from '../controllers/book_user';

const router = Router();

const bookUserController = new BookUserController();

router.get('/book/:book_id', bookUserController.getAllInteractionsByBookId);
router.get('/user/:user_id', bookUserController.getAllInteractionsByUserId);

router.post('/add', bookUserController.add);

router.put('/update/:id', bookUserController.update);


export default router;
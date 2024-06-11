import { Router } from 'express';

import { InteractionController } from '../controllers/interaction';

const router = Router();

const interactionController = new InteractionController();

router.get('/book/:book_id', interactionController.getAllInteractionsByBookId);
router.get('/user/:user_id', interactionController.getAllInteractionsByUserId);

router.get('/user/especific/:user_id', interactionController.getEspecificInteractionsByUserId);

router.get('/user/liked/:user_id', interactionController.getBookLikedByUserId);
router.get('/user/want-to-read/:user_id', interactionController.getBookWantToReadByUserId);
router.get('/user/already-readed/:user_id', interactionController.getBookAlreadyReadByUserId);

router.post('/add', interactionController.add);

router.put('/update/:id', interactionController.update);


export default router;
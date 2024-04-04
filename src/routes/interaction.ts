import { Router } from 'express';

import { InteractionController } from '../controllers/interaction';

const router = Router();

const interactionController = new InteractionController();

router.get('/book/:book_id', interactionController.getAllInteractionsByBookId);
router.get('/user/:user_id', interactionController.getAllInteractionsByUserId);

router.post('/add', interactionController.add);

router.put('/update/:id', interactionController.update);


export default router;
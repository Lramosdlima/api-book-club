import { Router } from 'express';

import { TagController } from '../controllers/tag';

const router = Router();

const tagController = new TagController();

router.get('/all', tagController.getAll);
router.get('/:id', tagController.getById);

router.post('/create', tagController.create);

router.put('/update/:id', tagController.update);

router.delete('/delete/:id', tagController.exclude);

export default router;
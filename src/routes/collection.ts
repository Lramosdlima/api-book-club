import { Router } from 'express';

import { CollectionController } from '../controllers/collection';

const router = Router();

const collectionController = new CollectionController();

router.get('/all', collectionController.getAll);
router.get('/:id', collectionController.getById);
router.get('/user/:owner_id', collectionController.getAllByOwnerId);

router.post('/create', collectionController.create);
router.post('/add', collectionController.addCollectionToUser);

router.put('/update/:id', collectionController.update);

router.delete('/delete/:id', collectionController.exclude);

export default router;
import { Router } from 'express';

import { CollectionController } from '../controllers/collection';

const router = Router();

const collectionController = new CollectionController();

router.get('/all', collectionController.getAll); // Todas coleções da comunidade
router.get('/:id', collectionController.getById); // Uma coleção específica
router.get('/user/:owner_id', collectionController.getAllByOwnerId); // Coleções que o usuário criou

router.post('/create', collectionController.create); // Cria uma nova coleção
router.post('/user/add', collectionController.addCollectionToUser); // Adiciona uma coleção a um usuário

router.patch('/update/:id', collectionController.update); // Atualiza nome ou descrição de uma coleção
router.put('/add/book/:id', collectionController.addBookToCollection); // Adiciona um ou mais livros a uma coleção

router.delete('/delete/:id', collectionController.exclude); // Deleta uma coleção
router.delete('/user/remove/:id', collectionController.removeCollectionFromUser); // Remove uma coleção de um usuário

export default router;